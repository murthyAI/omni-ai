"use client";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
  fileName?: string;
  filePreview?: string;
};

type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

const CHATS_STORAGE_KEY = "omni-ai-conversations";
const ACTIVE_CHAT_KEY = "omni-ai-active-conversation";

const welcomeMessage: ChatMessage = {
  role: "ai",
  text: "Hello! Welcome to OMNI AI. How can I help you today?",
};

function createConversation(): Conversation {
  const conversationId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());

  return {
    id: conversationId,
    title: "New Chat",
    messages: [welcomeMessage],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function createChatTitle(text: string) {
  const cleanedText = text.trim().replace(/\s+/g, " ");

  if (!cleanedText) {
    return "New Chat";
  }

  if (cleanedText.length <= 32) {
    return cleanedText;
  }

  return cleanedText.slice(0, 32) + "...";
}

export default function ChatPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId
    ) || null;

  const messages = activeConversation?.messages || [welcomeMessage];

  useEffect(() => {
    try {
      const savedChats = localStorage.getItem(CHATS_STORAGE_KEY);
      const savedActiveChat = localStorage.getItem(ACTIVE_CHAT_KEY);

      if (savedChats) {
        const parsedChats = JSON.parse(savedChats) as Conversation[];

        if (Array.isArray(parsedChats) && parsedChats.length > 0) {
          setConversations(parsedChats);

          const activeChatExists = parsedChats.some(
            (conversation) => conversation.id === savedActiveChat
          );

          if (savedActiveChat && activeChatExists) {
            setActiveConversationId(savedActiveChat);
          } else {
            setActiveConversationId(parsedChats[0].id);
          }

          setHistoryLoaded(true);
          return;
        }
      }

      const firstConversation = createConversation();

      setConversations([firstConversation]);
      setActiveConversationId(firstConversation.id);
    } catch (error) {
      console.error("Unable to load conversations:", error);

      const firstConversation = createConversation();

      setConversations([firstConversation]);
      setActiveConversationId(firstConversation.id);
    } finally {
      setHistoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!historyLoaded) return;

    try {
      const conversationsToSave = conversations.map((conversation) => ({
        ...conversation,
        messages: conversation.messages.map((chatMessage) => ({
          role: chatMessage.role,
          text: chatMessage.text,
          fileName: chatMessage.fileName,
        })),
      }));

      localStorage.setItem(
        CHATS_STORAGE_KEY,
        JSON.stringify(conversationsToSave)
      );

      if (activeConversationId) {
        localStorage.setItem(ACTIVE_CHAT_KEY, activeConversationId);
      }
    } catch (error) {
      console.error("Unable to save conversations:", error);
    }
  }, [conversations, activeConversationId, historyLoaded]);

  function updateConversationMessages(
    conversationId: string,
    updater: (previousMessages: ChatMessage[]) => ChatMessage[]
  ) {
    setConversations((previousConversations) =>
      previousConversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,
          messages: updater(conversation.messages),
          updatedAt: Date.now(),
        };
      })
    );
  }

  function updateConversationTitle(
    conversationId: string,
    newTitle: string
  ) {
    setConversations((previousConversations) =>
      previousConversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,
          title: newTitle,
          updatedAt: Date.now(),
        };
      })
    );
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied ✅");
    } catch {
      alert("Unable to copy this message.");
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];

        if (!base64Data) {
          reject(new Error("Unable to read the selected image."));
          return;
        }

        resolve(base64Data);
      };

      reader.onerror = () => {
        reject(new Error("Unable to read the selected image."));
      };

      reader.readAsDataURL(file);
    });
  }

  function handleFileSelect(file?: File) {
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedPreview(previewUrl);
    } else {
      setSelectedPreview("");
    }

    setShowAddMenu(false);
  }

  function removeSelectedFile() {
    setSelectedFile(null);
    setSelectedPreview("");
  }

  function startNewChat() {
    if (loading) return;

    const newConversation = createConversation();

    setConversations((previousConversations) => [
      newConversation,
      ...previousConversations,
    ]);

    setActiveConversationId(newConversation.id);
    setMessage("");
    setSelectedFile(null);
    setSelectedPreview("");
    setShowAddMenu(false);
  }

  function openConversation(conversationId: string) {
    if (loading) return;

    setActiveConversationId(conversationId);
    setMessage("");
    setSelectedFile(null);
    setSelectedPreview("");
    setShowAddMenu(false);
  }

  function renameConversation(conversation: {
  id: string;
  title: string;
}) {
    const newTitle = window.prompt(
      "Enter a name for this chat:",
      conversation.title
    );

    if (!newTitle?.trim()) return;

    updateConversationTitle(
      conversation.id,
      newTitle.trim().slice(0, 50)
    );
  }

  function deleteConversation(conversationId: string) {
    if (loading) return;

    const shouldDelete = window.confirm(
      "Do you want to delete this chat?"
    );

    if (!shouldDelete) return;

    const remainingConversations = conversations.filter(
      (conversation) => conversation.id !== conversationId
    );

    if (remainingConversations.length === 0) {
      const newConversation = createConversation();

      setConversations([newConversation]);
      setActiveConversationId(newConversation.id);
      return;
    }

    setConversations(remainingConversations);

    if (activeConversationId === conversationId) {
      setActiveConversationId(remainingConversations[0].id);
    }
  }

  function clearAllChats() {
    if (loading) return;

    const shouldClear = window.confirm(
      "Do you want to delete all chat history?"
    );

    if (!shouldClear) return;

    const newConversation = createConversation();

    setConversations([newConversation]);
    setActiveConversationId(newConversation.id);
    setMessage("");
    setSelectedFile(null);
    setSelectedPreview("");
    setShowAddMenu(false);
  }

  async function sendMessage() {
    if (
      (!message.trim() && !selectedFile) ||
      loading ||
      !activeConversationId
    ) {
      return;
    }

    const currentConversationId = activeConversationId;

    const currentConversation = conversations.find(
      (conversation) => conversation.id === currentConversationId
    );

    const currentFile = selectedFile;
    const currentPreview = selectedPreview;

    const userMessage =
      message.trim() ||
      "Please analyze this uploaded image clearly.";

    const userChatMessage: ChatMessage = {
      role: "user",
      text: userMessage,
      fileName: currentFile?.name,
      filePreview: currentPreview,
    };

    updateConversationMessages(
      currentConversationId,
      (previousMessages) => [
        ...previousMessages,
        userChatMessage,
      ]
    );

    if (
      currentConversation &&
      currentConversation.title === "New Chat"
    ) {
      updateConversationTitle(
        currentConversationId,
        createChatTitle(userMessage)
      );
    }

    setMessage("");
    setSelectedFile(null);
    setSelectedPreview("");
    setShowAddMenu(false);
    setLoading(true);

    try {
      let imagePayload = null;

      if (currentFile?.type.startsWith("image/")) {
        const base64Data = await fileToBase64(currentFile);

        imagePayload = {
          mimeType: currentFile.type,
          data: base64Data,
        };
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          image: imagePayload,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.reply ||
            data.error ||
            "Unable to receive an AI response."
        );
      }

      updateConversationMessages(
        currentConversationId,
        (previousMessages) => [
          ...previousMessages,
          {
            role: "ai",
            text:
              data.reply ||
              "No response was received from OMNI AI.",
          },
        ]
      );
    } catch (error) {
      console.error("Chat error:", error);

      updateConversationMessages(
        currentConversationId,
        (previousMessages) => [
          ...previousMessages,
          {
            role: "ai",
            text:
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-[calc(100vh-70px)] max-w-[1600px]">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          loading={loading}
          onNewChat={startNewChat}
          onOpenConversation={openConversation}
          onRenameConversation={renameConversation}
          onDeleteConversation={deleteConversation}
          onClearAllChats={clearAllChats}
        />

        <section className="min-w-0 flex-1 p-4 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold text-cyan-400">
              AI Chat
            </h1>

            <p className="mt-2 text-zinc-400">
              Chat with OMNI AI and get real AI answers.
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
              <ChatMessages
                messages={messages}
                loading={loading}
                onCopy={copyText}
              />

              <ChatInput
                message={message}
                loading={loading}
                showAddMenu={showAddMenu}
                selectedFile={selectedFile}
                selectedPreview={selectedPreview}
                onMessageChange={setMessage}
                onToggleAddMenu={() =>
                  setShowAddMenu((previousValue) => !previousValue)
                }
                onFileSelect={handleFileSelect}
                onRemoveSelectedFile={removeSelectedFile}
                onSend={sendMessage}
                onCreateImage={() => router.push("/image")}
                onDeepResearch={() =>
                  alert("Deep Research will be available soon.")
                }
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}