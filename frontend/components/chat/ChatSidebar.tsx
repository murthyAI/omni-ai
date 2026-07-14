"use client";

type Conversation = {
  id: string;
  title: string;
  updatedAt: number;
};

type ChatSidebarProps = {
  conversations: Conversation[];
  activeConversationId: string;
  loading: boolean;
  onNewChat: () => void;
  onOpenConversation: (conversationId: string) => void;
  onRenameConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversationId: string) => void;
  onClearAllChats: () => void;
};

function formatUpdatedTime(updatedAt: number) {
  const updatedDate = new Date(updatedAt);
  const now = new Date();

  const isToday =
    updatedDate.getDate() === now.getDate() &&
    updatedDate.getMonth() === now.getMonth() &&
    updatedDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return updatedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return updatedDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  });
}

export default function ChatSidebar({
  conversations,
  activeConversationId,
  loading,
  onNewChat,
  onOpenConversation,
  onRenameConversation,
  onDeleteConversation,
  onClearAllChats,
}: ChatSidebarProps) {
  const sortedConversations = [...conversations].sort(
    (firstChat, secondChat) =>
      secondChat.updatedAt - firstChat.updatedAt
  );

  return (
    <aside className="hidden w-72 shrink-0 border-r border-zinc-800 bg-zinc-950 p-4 lg:flex lg:flex-col">
      <div className="shrink-0">
        <button
          type="button"
          onClick={onNewChat}
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ＋ New Chat
        </button>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-zinc-200">
              Chat History
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              {conversations.length}{" "}
              {conversations.length === 1 ? "conversation" : "conversations"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClearAllChats}
            disabled={loading || conversations.length === 0}
            title="Clear all chats"
            aria-label="Clear all chats"
            className="rounded-lg px-2 py-1.5 text-sm text-red-400 transition hover:bg-red-950/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            🗑
          </button>
        </div>

        <div className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {sortedConversations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-black p-4 text-center">
              <p className="text-sm font-medium text-zinc-300">
                No chats yet
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Start a new conversation with OMNI AI.
              </p>
            </div>
          ) : (
            sortedConversations.map((conversation) => {
              const isActive =
                conversation.id === activeConversationId;

              return (
                <article
                  key={conversation.id}
                  className={
                    isActive
                      ? "rounded-xl border border-cyan-500 bg-zinc-900 p-2 shadow-sm shadow-cyan-950/30"
                      : "rounded-xl border border-zinc-800 bg-black p-2 transition hover:border-zinc-700 hover:bg-zinc-950"
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      onOpenConversation(conversation.id)
                    }
                    disabled={loading}
                    className="w-full rounded-lg px-2 py-2 text-left disabled:cursor-not-allowed disabled:opacity-50"
                    title={conversation.title}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={
                          isActive
                            ? "mt-0.5 text-cyan-400"
                            : "mt-0.5 text-zinc-500"
                        }
                      >
                        💬
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={
                            isActive
                              ? "truncate text-sm font-semibold text-white"
                              : "truncate text-sm font-medium text-zinc-300"
                          }
                        >
                          {conversation.title}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {formatUpdatedTime(conversation.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="mt-1 flex justify-end gap-1 px-1 pb-1">
                    <button
                      type="button"
                      title="Rename chat"
                      aria-label={`Rename ${conversation.title}`}
                      onClick={() =>
                        onRenameConversation(conversation)
                      }
                      disabled={loading}
                      className="rounded-lg px-2 py-1.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      title="Delete chat"
                      aria-label={`Delete ${conversation.title}`}
                      onClick={() =>
                        onDeleteConversation(conversation.id)
                      }
                      disabled={loading}
                      className="rounded-lg px-2 py-1.5 text-sm text-red-400 transition hover:bg-red-950/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      🗑️
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}