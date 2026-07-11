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
    <aside className="w-72 shrink-0 border-r border-zinc-800 bg-zinc-950 p-4">
      <button
        type="button"
        onClick={onNewChat}
        disabled={loading}
        className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-black hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
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
            onClick={onClearAllChats}
            disabled={loading}
            title="Clear all chats"
            className="text-sm text-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🗑
          </button>
        </div>

        <div className="mt-3 max-h-[70vh] space-y-2 overflow-y-auto">
          {sortedConversations.map((conversation) => (
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
                  onOpenConversation(conversation.id)
                }
                disabled={loading}
                className="w-full truncate px-2 py-2 text-left text-sm disabled:cursor-not-allowed disabled:opacity-50"
                title={conversation.title}
              >
                {conversation.title}
              </button>

              <div className="flex justify-end gap-3 px-2 pb-1 text-sm">
                <button
                  type="button"
                  title="Rename chat"
                  onClick={() =>
                    onRenameConversation(conversation)
                  }
                  disabled={loading}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  ✏️
                </button>

                <button
                  type="button"
                  title="Delete chat"
                  onClick={() =>
                    onDeleteConversation(conversation.id)
                  }
                  disabled={loading}
                  className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}