import { useState } from "react";
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Clock,
    Compass,
    MapPin,
    MessageCircle,
    Navigation,
    Radio,
    ShieldCheck,
    Sparkles,
    Truck,
    Zap,
} from "lucide-react";

import heroSkyline from "@/assets/hero-skyline.jpg";
import { MovingBg } from "@/components/effects/MovingBg";
import { Reveal } from "@/components/effects/Reveal";
import { Tilt } from "@/components/effects/Tilt";
import { defaultRiyadhLocations, type RiyadhLocation } from "@/lib/site-data";
import { useSiteApi } from "@/lib/use-site-api";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl, isExternalUrl } from "@/lib/whatsapp";

const zoneIcons: Record<string, typeof MapPin> = {
    "جنوب وغرب الرياض": Building2,
    "شرق الرياض": Truck,
    "شمال الرياض": Navigation,
};

const defaultTagsByHub: Record<string, string[]> = {
    "السويدي": ["توريد مصانع", "بوليمرات خام", "مواد غذائية بالجملة"],
    "الروضة": ["سلاسل الهايبرماركت", "توزيع سريع", "خدمات تموينية"],
    "النرجس": ["محور الشركات", "مشاريع كبرى", "جاهزية فورية"],
    "العارض": ["توسع استراتيجي", "شمال العاصمة", "أسطول شاحنات مجهز"],
};

export function RiyadhLocations() {
    const { data } = useSiteApi();
    const locations: RiyadhLocation[] = (data?.locations && data.locations.length > 0)
        ? data.locations
        : defaultRiyadhLocations;

    const whatsappRaw = data?.settings?.whatsapp || data?.contact?.phone || "";
    const [selectedHub, setSelectedHub] = useState<string | null>(null);

    return (
        <section
            id="locations"
            className="relative isolate overflow-hidden bg-[#060c1c] py-24 text-pearl md:py-36 border-y border-gold/20"
        >
            {/* Full-bleed dark animated luxury skyline background */}
            <MovingBg
                src={heroSkyline}
                tone="dark"
                imageOpacity={0.25}
                motion="kenburns"
                orbs={true}
                grid={true}
            />

            {/* Ambient luxury golden glowing spotlights */}
            <div
                className="pointer-events-none absolute -top-48 start-1/2 -z-10 h-[500px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-gold/25 via-gold/5 to-transparent blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute top-1/2 -start-24 -z-10 h-96 w-96 rounded-full bg-navy-2/60 blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute bottom-0 -end-24 -z-10 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
                aria-hidden
            />

            <div className="relative mx-auto max-w-7xl px-5 md:px-8">
                {/* Header Block: Highly Visible, High Contrast, Animated Beacon */}
                <div className="flex flex-col items-center text-center">
                    <Reveal>
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 shadow-[0_0_25px_rgba(212,175,55,0.25)] backdrop-blur-md">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            </span>
                            <span className="font-mono text-xs font-black tracking-widest text-gold-soft">
                                شبكة التوزيع اللوجستية بالعاصمة · RIYADH HUBS
                            </span>
                            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                                تشغيل نشط 24/7
                            </span>
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.18]">
                            مراكز التوزيع والتغطية الشاملة{" "}
                            <span className="gradient-text-shine block mt-2 sm:inline sm:mt-0">
                                في كافة أرجاء الرياض
                            </span>
                        </h2>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-5 max-w-3xl text-base font-medium leading-relaxed text-pearl/90 sm:text-lg">
                            تضمن <strong className="text-gold font-bold">مؤسسة سعود للتجارة</strong> سرعة الإمداد المباشر للسلع الغذائية والبوليمرات البلاستيكية الخام لكافة المصانع والشركات والهايبرماركت عبر مراكزنا ومحاورنا الاستراتيجية الأربعة في العاصمة.
                        </p>
                    </Reveal>
                </div>

                {/* Animated Interactive Logistics Radar & Network Status Bar */}
                <Reveal delay={250}>
                    <div className="mt-12 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-r from-[#0d1c3a]/90 via-[#10244c]/90 to-[#0d1c3a]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl md:p-6">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            {/* Left Info: Pulse indicator & quick status */}
                            <div className="flex items-center gap-4">
                                <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold/20 border border-gold/40 text-gold shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                                    <Radio size={24} className="animate-pulse" />
                                    <span className="absolute -top-1 -end-1 size-3.5 rounded-full border-2 border-[#0d1c3a] bg-emerald-500 animate-ping" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-extrabold text-white">منظومة الإمداد المركزي المباشر</span>
                                        <span className="rounded bg-gold/25 px-2 py-0.5 text-[10px] font-bold text-gold-soft">
                                            LIVE DISPATCH
                                        </span>
                                    </div>
                                    <p className="text-xs text-pearl/75 mt-0.5">
                                        تغطية جغرافية مكتملة تربط شمال، شرق، جنوب، وغرب الرياض بتوريد مباشر
                                    </p>
                                </div>
                            </div>

                            {/* Hub Selector Pills with active animations */}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedHub(null)}
                                    className={cn(
                                        "rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer",
                                        selectedHub === null
                                            ? "gradient-bg-gold text-ink shadow-[0_0_15px_rgba(212,175,55,0.6)] scale-105"
                                            : "border border-pearl/15 bg-white/5 text-pearl/80 hover:border-gold/50 hover:text-white"
                                    )}
                                >
                                    عرض جميع المراكز (4)
                                </button>
                                {locations.map((loc) => {
                                    const isSelected = selectedHub === loc.name;
                                    return (
                                        <button
                                            key={loc.name}
                                            type="button"
                                            onClick={() => setSelectedHub(isSelected ? null : loc.name)}
                                            className={cn(
                                                "flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer",
                                                isSelected
                                                    ? "gradient-bg-gold text-ink shadow-[0_0_15px_rgba(212,175,55,0.6)] scale-105"
                                                    : "border border-gold/25 bg-gold/10 text-gold-soft hover:border-gold hover:bg-gold/20 hover:text-white"
                                            )}
                                        >
                                            <span className={cn("size-2 rounded-full", isSelected ? "bg-ink" : "bg-emerald-400 animate-ping")} />
                                            <span>حي {loc.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Interactive Supply Network KPI Ribbon */}
                        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-pearl/10 pt-4 sm:grid-cols-4">
                            <div className="flex items-center gap-2.5 rounded-xl bg-black/25 px-3 py-2 border border-pearl/5">
                                <Zap size={16} className="text-gold shrink-0" />
                                <span className="text-xs font-semibold text-pearl/90">استجابة وتوريد فوري</span>
                            </div>
                            <div className="flex items-center gap-2.5 rounded-xl bg-black/25 px-3 py-2 border border-pearl/5">
                                <Truck size={16} className="text-gold shrink-0" />
                                <span className="text-xs font-semibold text-pearl/90">أسطول شاحنات مجهز</span>
                            </div>
                            <div className="flex items-center gap-2.5 rounded-xl bg-black/25 px-3 py-2 border border-pearl/5">
                                <ShieldCheck size={16} className="text-gold shrink-0" />
                                <span className="text-xs font-semibold text-pearl/90">مطابقة للمواصفات 100%</span>
                            </div>
                            <div className="flex items-center gap-2.5 rounded-xl bg-black/25 px-3 py-2 border border-pearl/5">
                                <Sparkles size={16} className="text-gold shrink-0" />
                                <span className="text-xs font-semibold text-pearl/90">أسعار تنافسية للجملة</span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Locations Grid: High-Contrast Obsidian Glass Cards with Floating Icons & Glowing Gold CTA */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {locations.map((loc, idx) => {
                        const Icon = zoneIcons[loc.zone || ""] || MapPin;
                        const itemWhatsAppUrl = getWhatsAppUrl(
                            whatsappRaw,
                            `السلام عليكم ورحمة الله، أود الاستفسار وطلب توريد وتوصيل مباشر إلى مركز/حي: ${loc.name}`
                        );
                        const isExternal = isExternalUrl(itemWhatsAppUrl);
                        const tags = defaultTagsByHub[loc.name] || ["توريد وتوزيع مباشر", "أسطول نقل سريع", "جاهزية فورية"];
                        const isHighlighted = selectedHub === null || selectedHub === loc.name;

                        return (
                            <Reveal key={loc.id || loc.name} delay={idx * 110} className="h-full">
                                <Tilt max={12} className="h-full rounded-2xl">
                                    <div
                                        className={cn(
                                            "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-500",
                                            "border-2 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]",
                                            isHighlighted
                                                ? "border-gold/40 bg-gradient-to-b from-[#132347]/95 via-[#0e1933]/98 to-[#060c1c] hover:-translate-y-2 hover:border-gold hover:shadow-[0_25px_60px_-10px_rgba(212,175,55,0.45)]"
                                                : "border-pearl/10 bg-[#0a1224]/80 opacity-45 hover:opacity-100 hover:border-gold/40"
                                        )}
                                    >
                                        {/* Golden Shimmer light sweep across card on hover */}
                                        <div className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-gold/15 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                                        {/* Radial soft golden glow on top corner */}
                                        <div className="pointer-events-none absolute -end-12 -top-12 size-36 rounded-full bg-gold/15 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-gold/30" />

                                        <div>
                                            {/* Top Meta: Number + Zone badge */}
                                            <div className="flex items-center justify-between gap-2 border-b border-pearl/15 pb-4">
                                                <span className="rounded-lg border border-gold/40 bg-gold/15 px-2.5 py-1 font-mono text-xs font-black tracking-widest text-gold shadow-xs">
                                                    HUB-0{idx + 1}
                                                </span>
                                                {loc.zone && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-xs font-bold text-gold-soft shadow-xs">
                                                        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                                                        {loc.zone}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Location Title & Icon */}
                                            <div className="mt-6 flex items-start gap-4">
                                                <div className="gradient-bg-gold flex size-14 shrink-0 items-center justify-center rounded-2xl text-ink shadow-[0_8px_22px_rgba(212,175,55,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                                    <Icon size={26} strokeWidth={2.2} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-white transition-colors duration-200 group-hover:text-gold-soft">
                                                        حي {loc.name}
                                                    </h3>
                                                    {loc.english && (
                                                        <span className="mt-0.5 block font-mono text-xs font-semibold text-gold/80">
                                                            {loc.english} District
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description / Address */}
                                            <p className="mt-4 text-xs font-medium leading-6 text-pearl/85 sm:text-sm">
                                                {loc.address || "تغطية شاملة وإمداد سريع لكافة المتطلبات التجارية والصناعية بالعاصمة."}
                                            </p>

                                            {/* Specific Tags / Feature Badges */}
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-md border border-pearl/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-pearl/80 transition-colors group-hover:border-gold/30 group-hover:text-gold-soft"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Button: High-Impact Golden CTA */}
                                        <div className="mt-7 border-t border-pearl/15 pt-5">
                                            <a
                                                href={itemWhatsAppUrl}
                                                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="group/btn relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#b38528] px-4 py-3.5 font-bold text-[#060c1c] shadow-[0_6px_22px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(212,175,55,0.75)] active:scale-95"
                                            >
                                                {/* Button light shimmer reflection */}
                                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

                                                <div className="flex items-center gap-2">
                                                    <MessageCircle size={18} className="fill-current text-[#060c1c] transition-transform duration-300 group-hover/btn:scale-125" />
                                                    <span className="text-xs sm:text-sm font-black tracking-wide">
                                                        طلب توريد إلى {loc.name}
                                                    </span>
                                                </div>

                                                <ArrowLeft
                                                    size={16}
                                                    strokeWidth={2.5}
                                                    className="transition-transform duration-300 group-hover/btn:-translate-x-1.5"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </Tilt>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Logistics Features Trust Ribbon */}
                <Reveal delay={350}>
                    <div className="mt-14 grid gap-6 rounded-2xl border-2 border-gold/30 bg-gradient-to-r from-[#0d1c3a]/95 via-[#10244c]/95 to-[#0d1c3a]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:grid-cols-3 sm:p-8 md:mt-18">
                        <div className="flex items-center gap-4">
                            <div className="gradient-bg-gold flex size-12 shrink-0 items-center justify-center rounded-2xl text-ink shadow-[0_6px_18px_rgba(212,175,55,0.45)]">
                                <Truck size={22} strokeWidth={2.2} />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-white">أسطول نقل وتوزيع مجهز</h4>
                                <p className="mt-1 text-xs text-pearl/80">نقل آمن للبضائع والبوليمرات والمواد الغذائية</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border-pearl/15 sm:border-s sm:ps-6">
                            <div className="gradient-bg-gold flex size-12 shrink-0 items-center justify-center rounded-2xl text-ink shadow-[0_6px_18px_rgba(212,175,55,0.45)]">
                                <Clock size={22} strokeWidth={2.2} />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-white">جدولة توصيل مرنة 24/7</h4>
                                <p className="mt-1 text-xs text-pearl/80">استجابة سريعة للطلبات والتوريدات الطارئة</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border-pearl/15 sm:border-s sm:ps-6">
                            <div className="gradient-bg-gold flex size-12 shrink-0 items-center justify-center rounded-2xl text-ink shadow-[0_6px_18px_rgba(212,175,55,0.45)]">
                                <ShieldCheck size={22} strokeWidth={2.2} />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-white">معايير فحص جودة صارمة</h4>
                                <p className="mt-1 text-xs text-pearl/80">مطابقة المواصفات السعودية والخليجية المعتمدة</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
