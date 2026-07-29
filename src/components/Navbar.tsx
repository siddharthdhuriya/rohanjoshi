import { siteConfig } from "@/config/site";
import { TicketButton } from "@/components/TicketButton";

const links = [
  { href: "#shows", label: "Shows" },
  { href: "#videos", label: "Videos" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-black/40 px-6 py-4 backdrop-blur-md md:px-12">
      <a href="#hero" className="font-display text-xl font-bold text-white">
        {siteConfig.name}
      </a>
      <nav className="hidden items-center gap-8 text-base font-medium text-neutral-200 md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
      <TicketButton className="px-5 py-2 text-sm">Tickets</TicketButton>
    </header>
  );
}
