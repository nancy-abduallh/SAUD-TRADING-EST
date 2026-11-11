import { useId, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUp, ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import heroPort from "@/assets/hero-port.jpg";
import logoMark from "@/assets/logo-mark.png";
import { MovingBg } from "@/components/effects/MovingBg";
import { Reveal } from "@/components/effects/Reveal";
import { Button } from "@/components/ui/button";
import { countries, defaultRiyadhLocations, sectors, type RiyadhLocation, type SectorKey } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useSiteApi } from "@/lib/use-site-api";
import { getWhatsAppUrl, isExternalUrl } from "@/lib/whatsapp";

const CONTACT = { email: "", phone: "" };

const QUICK_LINKS = [
    { href: "#sectors", label: "القطاعات" },
    { href: "#catalogue", label: "المنتجات" },
    { href: "#vision", label: "رؤيتنا" },
    { href: "#clients", label: "عملاؤنا" },
    { href: "#about", label: "عن الشركة" },
    { href: "#locations", label: "مراكز الرياض" },
];

function XIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function TikTokIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 10.86 4.49 6.3 6.3 0 0 0 1.84-4.49V8.58a8.28 8.28 0 0 0 4.89 1.59V6.73a4.8 4.8 0 0 1-3-.04z" />
        </svg>
    );
}

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
        </svg>
    );
}

function formatWhatsAppHref(input: string): string {
    return getWhatsAppUrl(input);
}

type SocialItem = {
    key: string;
    label: string;
    url: string;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
};

function buildSocialLinks(settings?: Record<string, string | null | undefined>): SocialItem[] {
    if (!settings) return [];
    const list: SocialItem[] = [];

    const xUrl = (settings.twitter || "").trim();
    if (xUrl) {
        list.push({ key: "twitter", label: "منصة إكس (Twitter)", url: xUrl, Icon: XIcon });
    }

    const igUrl = (settings.instagram || "").trim();
    if (igUrl) {
        list.push({ key: "instagram", label: "إنستغرام (Instagram)", url: igUrl, Icon: Instagram });
    }

    const ttUrl = (settings.tiktok || "").trim();
    if (ttUrl) {
        list.push({ key: "tiktok", label: "تيك توك (TikTok)", url: ttUrl, Icon: TikTokIcon });
    }

    const liUrl = (settings.linkedin || "").trim();
    if (liUrl) {
        list.push({ key: "linkedin", label: "لينكد إن (LinkedIn)", url: liUrl, Icon: Linkedin });
    }

    const fbUrl = (settings.facebook || "").trim();
    if (fbUrl) {
        list.push({ key: "facebook", label: "فيسبوك (Facebook)", url: fbUrl, Icon: Facebook });
    }

    const waRaw = (settings.whatsapp || "").trim();
    if (waRaw) {
        const waHref = formatWhatsAppHref(waRaw);
        if (waHref) {
            list.push({ key: "whatsapp", label: "واتساب (WhatsApp)", url: waHref, Icon: WhatsAppIcon });
        }
    }

    return list;
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <div className="border-b border-pearl/10 md:border-0">
            <h3 className="font-semibold">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen((o) => !o)}
                    className="flex w-full items-center justify-between py-4 text-start md:pointer-events-none md:cursor-default md:py-0"
                >
                    <span className="gradient-text-gold">{title}</span>
                    <ChevronDown
                        size={18}
                        aria-hidden
                        className={cn("text-gold transition-transform duration-300 md:hidden", open && "rotate-180")}
                    />
                </button>
            </h3>

            <div
                id={panelId}
                className={cn(
                    "grid transition-[grid-template-rows] duration-300 md:grid-rows-[1fr]",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
            >
                {/* `invisible` keeps hidden links out of the tab order; the transition delays it until the close animation ends */}
                <div className={cn("overflow-hidden transition-[visibility] duration-300", !open && "invisible md:visible")}>
                    <div className="pb-5 md:pb-0 md:pt-5">{children}</div>
                </div>
            </div>
        </div>
    );
}

export function Footer() {
    const { data } = useSiteApi();
    const contactEmail = data?.contact?.email || CONTACT.email;
    const contactPhone = data?.contact?.phone || CONTACT.phone;
    const contactAddress = data?.contact?.address || "الرياض، المملكة العربية السعودية";
    const siteName = data?.settings?.site_name || "SAUD TRADING EST.";
    const whatsappRaw = data?.settings?.whatsapp || data?.contact?.phone || "";
    const ctaHref = getWhatsAppUrl(
        whatsappRaw,
        "السلام عليكم ورحمة الله، أود الاستفسار عن خدمات وتوريدات مؤسسة سعود للتجارة."
    );
    const isCtaExternal = isExternalUrl(ctaHref);
    const socialLinks = buildSocialLinks(data?.settings);
    const locations: RiyadhLocation[] = (data?.locations && data.locations.length > 0) ? data.locations : defaultRiyadhLocations;

    return (
        <footer id="contact" className="relative isolate overflow-hidden bg-ink pt-16 text-pearl md:pt-24">
            <MovingBg src={heroPort} tone="dark" imageOpacity={0.45} />
            <div className="relative mx-auto max-w-7xl px-5 md:px-8">
                <Reveal>
                    <div className="gradient-bg-navy relative overflow-hidden rounded-3xl border border-gold/35 p-7 shadow-[0_50px_90px_-40px_oklch(0_0_0)] sm:p-10 md:rounded-[2rem] md:p-14">
                        <span className="orb orb-a" data-tone="dark" />
                        <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center md:gap-8">
                            <div className="max-w-2xl">
                                <span className="font-mono text-xs tracking-widest text-gold-soft">LET'S WORK TOGETHER</span>
                                <h2 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl md:text-5xl">
                                    لنبدأ <span className="gradient-text-shine">شراكة تجارية</span> تدوم
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-pearl/65 sm:text-base">
                                    فريقنا جاهز للرد على استفساراتكم وتجهيز عروض التوريد المناسبة لاحتياجاتكم.
                                </p>
                            </div>
                            <Button variant="gold" size="lg" className="w-full sm:w-auto" asChild>
                                <a
                                    href={ctaHref}
                                    {...(isCtaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                >
                                    تواصل معنا <ArrowLeft size={18} />
                                </a>
                            </Button>
                        </div>
                    </div>
                </Reveal>

                <div className="mt-14 grid gap-x-12 md:mt-20 md:grid-cols-2 md:gap-y-12 lg:grid-cols-[1.4fr_0.7fr_1fr_1fr]">
                    {/* Brand block — always visible */}
                    <div className="pb-8 md:pb-0">
                        <div className="flex items-center gap-3">
                            <img src={logoMark} alt="شعار سعود التجارية" className="h-10 w-auto" />
                            <span className="text-2xl font-bold md:text-3xl">
                                سعود التجارية<span className="gradient-text-gold">.</span>
                            </span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-pearl/60">
                            شركة سعودية متخصصة في تجارة المواد الغذائية والبلاستيكية، وتقديم حلول رقمية متكاملة مدعومة بالذكاء الاصطناعي.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {countries.map((c) => (
                                <span key={c.name} className="rounded-full border border-pearl/15 px-3 py-1 text-xs text-pearl/70">
                                    {c.name}
                                </span>
                            ))}
                        </div>

                        
                        {locations.length > 0 && (
                            <div className="mt-5">
                                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-soft/90">
                                    <MapPin size={13} className="text-gold" />
                                    تغطية ومراكز التوزيع بالرياض:
                                </span>
                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                    {locations.map((loc) => (
                                        <span
                                            key={loc.name}
                                            className="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/5 px-2.5 py-0.5 text-xs text-pearl/85 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
                                        >
                                            <span className="size-1.5 rounded-full bg-gold/80" />
                                            {loc.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links — Brand Block (Desktop & Mobile) */}
                        {socialLinks.length > 0 && (
                            <div className="mt-7">
                                <span className="block text-xs font-semibold uppercase tracking-wider text-gold-soft/90">
                                    تابعنا على منصاتنا
                                </span>
                                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                                    {socialLinks.map((item) => (
                                        <a
                                            key={item.key}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={item.label}
                                            title={item.label}
                                            className="group relative flex size-10 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-pearl/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold/15 hover:text-gold hover:shadow-[0_8px_24px_-6px_oklch(0.655_0.106_75.6/0.5)] active:scale-95 sm:size-11"
                                        >
                                            <item.Icon size={19} className="transition-transform duration-300 group-hover:scale-110" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* On mobile the first accordion gets a top border so the three rows read as one list */}
                    <div className="border-t border-pearl/10 md:contents">
                        <FooterColumn title="روابط سريعة">
                            <ul className="grid gap-3 text-sm text-pearl/65">
                                {QUICK_LINKS.map((l) => (
                                    <li key={l.href}>
                                        <a href={l.href} className="transition-colors hover:text-gold-soft">
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </FooterColumn>
                    </div>

                    <FooterColumn title="قطاعاتنا">
                        <ul className="grid gap-3 text-sm text-pearl/65">
                            {(Object.keys(sectors) as SectorKey[]).map((key) => (
                                <li key={key}>
                                    <a href="#catalogue" className="transition-colors hover:text-gold-soft">
                                        {sectors[key].title}
                                    </a>
                                </li>
                            ))}
                        
                            {locations.length > 0 && (
                                <li className="mt-2 rounded-xl border border-pearl/10 bg-pearl/5 p-3.5">
                                    <span className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-gold">
                                        <MapPin size={14} className="text-gold" />
                                        مراكز التوزيع في الرياض:
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {locations.map((loc) => {
                                            const locWhatsAppHref = getWhatsAppUrl(
                                                whatsappRaw,
                                                `السلام عليكم ورحمة الله، أود الاستفسار عن التوريد والتوصيل إلى مركز/حي: ${loc.name}`
                                            );
                                            return (
                                                <a
                                                    key={loc.name}
                                                    href={locWhatsAppHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`طلب توريد إلى ${loc.name} عبر واتساب`}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-gold/25 bg-ink/80 px-2 py-1 text-[11px] font-medium text-pearl/90 transition-all hover:border-gold hover:bg-gold/15 hover:text-gold active:scale-95"
                                                >
                                                    <span className="size-1 rounded-full bg-gold" />
                                                    {loc.name}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </FooterColumn>

                    <FooterColumn title="تواصل">
                        <ul className="grid gap-4 text-sm text-pearl/65">
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="shrink-0 text-gold" />
                                {contactAddress}
                            </li>
                            {contactEmail && (
                                <li className="flex items-center gap-3">
                                    <Mail size={16} className="shrink-0 text-gold" />
                                    <a href={`mailto:${contactEmail}`} className="font-mono hover:text-gold-soft">
                                        {contactEmail}
                                    </a>
                                </li>
                            )}
                            {contactPhone && (
                                <li className="flex items-center gap-3">
                                    <Phone size={16} className="shrink-0 text-gold" />
                                    <a dir="ltr" href={`tel:${contactPhone}`} className="font-mono hover:text-gold-soft">
                                        {contactPhone}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </FooterColumn>
                </div>

                {/* Bottom Bar with Copyright, Social Icons, and Scroll-to-Top */}
                <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-pearl/10 py-6 sm:flex-row md:mt-16 md:py-8">
                    {/* dir="ltr" keeps the English line in the right word order inside the RTL page */}
                    <p dir="ltr" className="text-center font-mono text-xs leading-relaxed text-pearl/45 sm:text-right">
                        © 2026 {siteName} — Your Success, Our Commitment
                    </p>

                    {socialLinks.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2" aria-label="روابط التواصل الاجتماعي">
                            {socialLinks.map((item) => (
                                <a
                                    key={`bottom-${item.key}`}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.label}
                                    title={item.label}
                                    className="group flex size-9 items-center justify-center rounded-lg border border-gold/20 bg-ink/60 text-pearl/70 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10 hover:text-gold active:scale-95"
                                >
                                    <item.Icon size={16} className="transition-transform duration-200 group-hover:scale-110" />
                                </a>
                            ))}
                        </div>
                    )}

                    <a
                        href="#top"
                        aria-label="العودة للأعلى"
                        className="gradient-bg-gold flex size-10 shrink-0 items-center justify-center rounded-full text-ink shadow-lg transition-transform hover:-translate-y-1 sm:size-11"
                    >
                        <ArrowUp size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
