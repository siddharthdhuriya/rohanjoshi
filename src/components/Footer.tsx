import { siteConfig } from "@/config/site";
import { TicketButton } from "@/components/TicketButton";

export function Footer() {
  return (
    <footer className="bg-black px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 border-t border-neutral-800 pt-10 md:flex-row md:items-center">
        <div>
          <p className="font-display text-3xl font-bold text-white">
            Book Rohan for your next show.
          </p>
          <p className="mt-2 text-base text-neutral-300">
            Booking:{" "}
            <a
              href={`mailto:${siteConfig.contact.booking}`}
              className="text-neutral-100 underline underline-offset-4 hover:text-white"
            >
              {siteConfig.contact.booking}
            </a>
          </p>
          <div className="mt-4 flex gap-5 text-base text-neutral-300">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={siteConfig.youtube.channelUrl} target="_blank" rel="noreferrer" className="hover:text-white">
              YouTube
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
              Facebook
            </a>
            <a href={siteConfig.ticketUrl} target="_blank" rel="noreferrer" className="hover:text-white">
              Linktree
            </a>
          </div>
        </div>
        <TicketButton />
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-sm text-neutral-500">
        © {new Date().getFullYear()} {siteConfig.name}. Fan-built site
        scaffold — swap in a full press kit as more shows and photos land.
      </p>
    </footer>
  );
}
