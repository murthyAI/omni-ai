import MessageActions from "./MessageActions";
import TypingIndicator from "./TypingIndicator";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
  fileName?: string;
  filePreview?: string;
};

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  onCopy: (text: string) => void;
};

export default function ChatMessages({
  messages,
  loading,
  onCopy,
}: Props) {
  return (
    <div className="h-[430px] overflow-y-auto rounded-xl border border-zinc-800 bg-black p-4 space-y-4">

      {messages.map((message, index) => (

        <div
          key={index}
          className={
            message.role === "user"
              ? "flex justify-end"
              : "flex justify-start"
          }
        >

          <div
            className={
              message.role === "user"
                ? "max-w-[80%] rounded-2xl bg-cyan-600 px-4 py-3 text-white"
                : "max-w-[80%] rounded-2xl bg-zinc-900 px-4 py-3 text-white"
            }
          >

            <p className="font-semibold text-cyan-300">

              {message.role === "user"
                ? "You"
                : "🤖 OMNI AI"}

            </p>

            {message.filePreview && (

              <img
                src={message.filePreview}
                alt="Preview"
                className="mt-3 max-h-56 rounded-xl border border-zinc-700"
              />

            )}

            {message.fileName && (

              <p className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-sm">

                📎 {message.fileName}

              </p>

            )}

            <p className="mt-2 whitespace-pre-wrap">

              {message.text}

            </p>

            <MessageActions
              role={message.role}
              text={message.text}
              onCopy={() => onCopy(message.text)}
            />

          </div>

        </div>

      ))}

      {loading && <TypingIndicator />}

    </div>
  );
}