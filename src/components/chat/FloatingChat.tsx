/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { askIA } from "@/lib/api";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";

const STORAGE_ID = "chat:conversationId";
const STORAGE_MSGS = (id: string) => `chat:msgs:${id}`;

type ChatMsg = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  ts: number;
};

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Hola, soy tu asistente. Escribe tu pregunta y te respondo.",
          ts: Date.now(),
        },
      ]);
    }
  }, [open, msgs.length]);

  useEffect(() => {
    let id = localStorage.getItem(STORAGE_ID);
    if (!id) {
      id = uuid();
      localStorage.setItem(STORAGE_ID, id);
    }
    setConversationId(id);

    const raw = localStorage.getItem(STORAGE_MSGS(id));
    if (raw) {
      try {
        setMsgs(JSON.parse(raw));
      } catch {
        console.error("A ocurrido un erro");
      }
    }
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    localStorage.setItem(STORAGE_MSGS(conversationId), JSON.stringify(msgs));
  }, [msgs, conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [msgs, open]);

  async function handleSend() {
    const q = input.trim();
    if (!q || sending) return;

    const userMsg: ChatMsg = {
      id: crypto.randomUUID(),
      role: "user",
      text: q,
      ts: Date.now(),
    };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const answer = await askIA(q);
      const botMsg: ChatMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: answer || "(sin respuesta)",
        ts: Date.now(),
      };
      setMsgs((prev) => [...prev, botMsg]);
    } catch (e: any) {
      const errMsg: ChatMsg = {
        id: crypto.randomUUID(),
        role: "system",
        text: e?.message || "Error desconocido",
        ts: Date.now(),
      };
      setMsgs((prev) => [...prev, errMsg]);
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // function newConversation() {
  //   const id = uuid();
  //   localStorage.setItem(STORAGE_ID, id);
  //   setConversationId(id);
  //   setMsgs([]);
  //   localStorage.removeItem(STORAGE_MSGS(id)); // opcional
  // }

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Panel lateral */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[420px] p-0 flex flex-col"
        >
          <SheetHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
            <SheetTitle className="text-base flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Asistente
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>

          {/* Contenido: mensajes + input */}
          <div className="flex-1 min-h-0 flex flex-col">
            {/* Mensajes con scroll */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-3">
                {msgs.map((m) => (
                  <Bubble key={m.id} role={m.role} text={m.text} />
                ))}
                <div ref={endRef} />
              </div>
            </div>

            <Separator />

            {/* Input */}
            <div className="p-3">
              <div className="flex items-end gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={
                    sending ? "Enviando..." : "Escribe tu pregunta..."
                  }
                  disabled={sending}
                  className="min-h-[48px] max-h-40 resize-none"
                />
                <Button
                  onClick={handleSend}
                  disabled={sending || !input.trim()}
                  className="h-[48px]"
                  aria-label="Enviar"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Enter para enviar • Shift+Enter para salto de línea
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function Bubble({
  role,
  text,
}: {
  role: "user" | "assistant" | "system";
  text: string;
}) {
  const isUser = role === "user";
  const isSystem = role === "system";

  return (
    <div
      className={cn(
        "flex items-start gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div
          className={cn(
            "mt-1 rounded-full p-1 border",
            isSystem ? "opacity-60" : ""
          )}
          aria-hidden
        >
          {isSystem ? <X className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
          isSystem
            ? "bg-muted text-muted-foreground"
            : isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {text}
      </div>
      {isUser && (
        <div className="mt-1 rounded-full p-1 border" aria-hidden>
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
