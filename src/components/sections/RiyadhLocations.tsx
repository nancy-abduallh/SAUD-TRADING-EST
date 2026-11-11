import { ArrowLeft, Building2, CheckCircle2, Clock, MapPin, ShieldCheck, Truck } from "lucide-react";

import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { Tilt } from "@/components/effects/Tilt";
import { Button } from "@/components/ui/button";
import { defaultRiyadhLocations, type RiyadhLocation } from "@/lib/site-data";
import { useSiteApi } from "@/lib/use-site-api";
import { getWhatsAppUrl, isExternalUrl } from "@/lib/whatsapp";

const zoneIcons: Record<string, typeof MapPin> = {
    "جنوب وغرب الرياض": Building2,
    "شرق الرياض": Truck,
    "شمال الرياض": MapPin,
};

export function RiyadhLocations() {
    const { data } = useSiteApi();
    const locations: RiyadhLocation[] = (data?.locations && data.locations.length > 0)
        ? data.locations
        : defaultRiyadhLocations;

    const whatsappRaw = data?.settings?.whatsapp || data?.contact?.phone || "";

    return (
        <section id="locations" className="relative isolate overflow-hidden py-20 text-pearl md:py-32">
            {/* Background luxury gradient & ambient light */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-[at_50%_0%] from-gold/10 via-surface/40 to-ink" />
            <div className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <Reveal>
                    <SectionHeading
                        eyebrow="شبكة التوزيع اللوجستية · RIYADH HUBS"
                        title={
                            <>
                                مراكز التوزيع والتغطية <span className="gradient-text-gold">في الرياض</span>
                            </>
                        }
                        description="تضمن مؤسسة سعود للتجارة سرعة الإمداد المباشر للسلع الغذائية والبوليمرات البلاستيكية الخام لكافة المصانع والشركات والهايبرماركت عبر مراكزنا ومحاورنا الاستراتيجية في العاصمة."
                    />
                </Reveal>

                {/* Locations Grid */}
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {locations.map((loc, idx) => {
                        const Icon = zoneIcons[loc.zone || ""] || MapPin;
                        const itemWhatsAppUrl = getWhatsAppUrl(
                            whatsappRaw,
                            `السلام عليكم ورحمة الله، أود الاستفسار وطلب توريد وتوصيل مباشر إلى مركز/حي: ${loc.name}`
                        );
                        const isExternal = isExternalUrl(itemWhatsAppUrl);

                        return (
                            <Reveal key={loc.id || loc.name} delay={idx * 90} className="h-full">
                                <Tilt max={10} className="h-full rounded-2xl">
                                    <div className="glass-dark gold-border group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-12px_oklch(0.655_0.106_75.6/0.45)]">
                                        {/* Subtle corner golden highlight on hover */}
                                        <div className="pointer-events-none absolute -end-12 -top-12 size-28 rounded-full bg-gold/10 blur-2xl transition-opacity duration-300 group-hover:bg-gold/25" />

                                        <div>
                                            {/* Top Meta: Number + Zone badge */}
                                            <div className="flex items-center justify-between gap-2 border-b border-pearl/10 pb-4">
                                                <span className="font-mono text-xs font-bold tracking-wider text-gold">
                                                    HUB-0{idx + 1}
                                                </span>
                                                {loc.zone && (
                                                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold-soft">
                                                        <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                                                        {loc.zone}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Location Title & Icon */}
                                            <div className="mt-5 flex items-start gap-3.5">
                                                <div className="gradient-bg-gold flex size-11 shrink-0 items-center justify-center rounded-xl text-ink shadow-[0_8px_18px_-6px_oklch(0.655_0.106_75.6/0.8)] transition-transform duration-300 group-hover:scale-110">
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-pearl transition-colors group-hover:text-gold-soft">
                                                        حي {loc.name}
                                                    </h3>
                                                    {loc.english && (
                                                        <span className="font-mono text-xs text-pearl/50">
                                                            {loc.english} District
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description / Address */}
                                            <p className="mt-4 text-xs leading-6 text-pearl/65 sm:text-sm">
                                                {loc.address || "تغطية شاملة وإمداد سريع لكافة المتطلبات التجارية والصناعية."}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-6 border-t border-pearl/10 pt-4">
                                            <Button
                                                variant="ghost"
                                                asChild
                                                className="w-full justify-between rounded-xl border border-gold/20 bg-gold/5 px-3 py-2 text-xs font-semibold text-gold hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
                                            >
                                                <a
                                                    href={itemWhatsAppUrl}
                                                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                >
                                                    <span>طلب توريد إلى {loc.name}</span>
                                                    <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </Tilt>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Logistics Features Ribbon */}
                <Reveal delay={300}>
                    <div className="gradient-bg-navy gold-border mt-12 grid gap-6 rounded-2xl p-6 sm:grid-cols-3 sm:p-8 md:mt-16">
                        <div className="flex items-center gap-3.5">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                                <Truck size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-pearl">أسطول نقل وتوزيع مجهز</h4>
                                <p className="mt-1 text-xs text-pearl/60">نقل آمن للبضائع والبوليمرات والمواد الغذائية</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 border-pearl/10 sm:border-s sm:ps-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-pearl">جدولة توصيل مرنة 24/7</h4>
                                <p className="mt-1 text-xs text-pearl/60">استجابة سريعة للطلبات والتوريدات الطارئة</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 border-pearl/10 sm:border-s sm:ps-6">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-pearl">معايير فحص جودة صارمة</h4>
                                <p className="mt-1 text-xs text-pearl/60">مطابقة المواصفات السعودية والخليجية المعتمدة</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
