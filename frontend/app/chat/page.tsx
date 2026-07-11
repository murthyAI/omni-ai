"use client";

import AddMenu from "@/components/AddMenu";
import { useEffect, useRef, useState } from "react";
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
  const uniqueId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());

  return {
    id: uniqueId,
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

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
      const safeConversations = conversations.map((conversation) => ({
        ...conversation,
        messages: conversation.messages.map((chatMessage) => ({
          role: chatMessage.role,
          text: chatMessage.text,
          fileName: chatMessage.fileName,
        })),
      }));

      localStorage.setItem(
        CHATS_STORAGE_KEY,
        JSON.stringify(safeConversations)
      );

      if (activeConversationId) {
        localStorage.setItem(ACTIVE_CHAT_KEY, activeConversationId);
      }
    } catch (error) {
      console.error("Unable to save conversations:", error);
    }
  }, [conversations, activeConversationId, historyLoaded]);

  useEffect(() => {
    if (loading) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [loading]);

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

  function renameConversation(conversation: Conversation) {
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
        <aside className="w-72 shrink-0 border-r border-zinc-800 bg-zinc-950 p-4">
          <button
            type="button"
            onClick={startNewChat}
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-black hover:bg-cyan-400 disabled:opacity-50"
          >
            ＋ New Chat
          </button>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-zinc-300">
                Chat History
              </h2>

              <button
                type="button"
                onClick={clearAllChats}
                title="Clear all chats"
                className="text-sm text-red-400 hover:text-red-300"
              >
                🗑
              </button>
            </div>

            <div className="mt-3 max-h-[70vh] space-y-2 overflow-y-auto">
              {conversations
                .slice()
                .sort(
                  (firstChat, secondChat) =>
                    secondChat.updatedAt - firstChat.updatedAt
                )
                .map((conversation) => (
                  <div
                    key={conversation.id}
                    className={
                      conversation.id === activeConversationId
                        ? "rounded-xl border border-cyan-500 bg-zinc-900 p-2"
                        : "rounded-xl border border-zinc-800 bg-black p-2"
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openConversation(conversation.id)
                      }
                      className="w-full truncate px-2 py-2 text-left text-sm"
                      title={conversation.title}
                    >
                      {conversation.title}
                    </button>

                    <div className="flex justify-end gap-3 px-2 pb-1 text-sm">
                      <button
                        type="button"
                        title="Rename chat"
                        onClick={() =>
                          renameConversation(conversation)
                        }
                      >
                        ✏️
                      </button>

                      <button
                        type="button"
                        title="Delete chat"
                        onClick={() =>
                          deleteConversation(conversation.id)
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 p-4 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-4xl font-bold text-cyan-400">
              AI Chat
            </h1>

            <p className="mt-2 text-zinc-400">
              Chat with OMNI AI and get real AI answers.
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6">
              <div className="h-[430px] space-y-4 overflow-y-auto rounded-xl border border-zinc-800 bg-black p-4">
                {messages.map((messageItem, messageIndex) => (
                  <div
                    key={messageIndex}
                    className={
                      messageItem.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        messageItem.role === "user"
                          ? "max-w-[90%] rounded-2xl bg-cyan-600 px-4 py-3 text-white sm:max-w-[80%]"
                          : "max-w-[90%] rounded-2xl bg-zinc-900 px-4 py-3 text-white sm:max-w-[80%]"
                      }
                    >
                      <p
                        className={
                          messageItem.role === "user"
                            ? "font-semibold text-cyan-100"
                            : "font-semibold text-cyan-400"
                        }
                      >
                        {messageItem.role === "user"
                          ? "You"
                          : "🤖 OMNI AI"}
                      </p>

                      {messageItem.filePreview && (
                        <img
                          src={messageItem.filePreview}
                          alt="Uploaded preview"
                          className="mt-3 max-h-56 rounded-xl border border-zinc-700"
                        />
                      )}

                      {messageItem.fileName && (
                        <p className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-sm">
                          📎 {messageItem.fileName}
                        </p>
                      )}

                      <p className="mt-2 whitespace-pre-wrap">
                        {messageItem.text}
                      </p>

                      <div className="mt-3 flex gap-3 text-lg opacity-80">
                        <button
                          type="button"
                          title="Copy"
                          onClick={() =>
                            copyText(messageItem.text)
                          }
                        >
                          📋
                        </button>

                        {messageItem.role === "ai" && (
                          <>
                            <button type="button" title="Like">
                              👍
                            </button>

                            <button
                              type="button"
                              title="Dislike"
                            >
                              👎
                            </button>

                            <button
                              type="button"
                              title="Regenerate"
                            >
                              🔄
                            </button>
                          </>
                        )}

                        {messageItem.role === "user" && (
                          <button type="button" title="Share">
                            🔗
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-zinc-900 px-4 py-3 text-zinc-400">
                      🤖 OMNI AI is analyzing...
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {selectedFile && (
                <div className="mt-4 rounded-xl border border-zinc-800 bg-black p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-zinc-300">
                      Selected: {selectedFile.name}
                    </p>

                    <button
                      type="button"
                      onClick={removeSelectedFile}
                      className="text-sm text-red-400"
                    >
                      ✕ Remove
                    </button>
                  </div>

                  {selectedPreview && (
                    <img
                      src={selectedPreview}
                      alt="Selected preview"
                      className="mt-3 max-h-40 rounded-xl border border-zinc-700"
                    />
                  )}
                </div>
              )}

              <div className="relative mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowAddMenu(!showAddMenu)
                  }
                  className="rounded-xl border border-zinc-700 px-4 py-3"
                  title="Add"
                >
                  +
                </button>

                <AddMenu
                  isOpen={showAddMenu}
                  onCamera={() =>
                    cameraInputRef.current?.click()
                  }
                  onGallery={() =>
                    galleryInputRef.current?.click()
                  }
                  onFiles={() =>
                    fileInputRef.current?.click()
                  }
                  onCreateImage={() =>
                    router.push("/image")
                  }
                  onDeepResearch={() =>
                    alert(
                      "Deep Research will be available soon."
                    )
                  }
                />

                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(event) =>
                    handleFileSelect(
                      event.target.files?.[0]
                    )
                  }
                />

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    handleFileSelect(
                      event.target.files?.[0]
                    )
                  }
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.csv,.zip,.js,.ts,.tsx,.jsx,.dart,.py,.java,.html,.css"
                  className="hidden"
                  onChange={(event) =>
                    handleFileSelect(
                      event.target.files?.[0]
                    )
                  }
                />

                <input
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  disabled={loading}
                  className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-black px-4 py-3 outline-none focus:border-cyan-400 disabled:opacity-60"
                  placeholder="Ask OMNI AI anything..."
                />

                <button
                  type="button"
                  className="rounded-xl border border-zinc-700 px-4 py-3"
                  title="Voice"
                >
                  🎤
                </button>

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={
                    loading ||
                    (!message.trim() && !selectedFile)
                  }
                  className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black disabled:opacity-50"
                >
                  {loading ? "..." : "➤"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}