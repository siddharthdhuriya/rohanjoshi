import { siteConfig } from "@/config/site";

export function TicketButton({
  className = "",
  children = "Get Tickets",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={siteConfig.ticketUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-display text-base font-bold uppercase tracking-wide text-white shadow-[0_0_30px_-5px_var(--accent)] transition-transform duration-200 hover:scale-105 hover:brightness-110 ${className}`}
    >
      {children}
    </a>
  );
}
