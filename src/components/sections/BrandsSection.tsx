import { type CSSProperties } from "react";
import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { useSiteApi } from "@/lib/use-site-api";

type Brand = { name: string; logo: string; url: string };

/** Small gold divider (line — diamond — line). */
function GoldDivider() {
    return (
        <div aria-hidden className="mx-auto mb-12 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 md:w-28" />
            <span className="gradient-bg-gold size-2 rotate-45" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 md:w-28" />
        </div>
    );
}

/** Per-logo animation offsets so cards never move in lockstep. */
function motionVars(index: number): CSSProperties {
    return {
        "--float-dur": `${5.5 + (index % 4) * 0.7}s`,
        "--float-delay": `-${((index * 1.4) % 5).toFixed(1)}s`,
        "--shine-delay": `${(index * 0.45).toFixed(2)}s`,
    } as CSSProperties;
}

/**
 * Displays partner/brand logos fetched dynamically from the admin database.
 * The entire section is strictly hidden (returns null) when there are no active brands added.
 */
export function BrandsSection() {
    const { data } = useSiteApi();
    const brands: Brand[] = data?.brands ?? [];

    // Strictly hide the entire section if no brands are added in the admin dashboard
    if (!brands || brands.length === 0) {
        return null;
    }

    return (
        <section
            id="brands"
            className="relative isolate overflow-hidden bg-pearl py-20 md:py-28"
        >
            {/* Subtle luxury ambient glows */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 right-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/[0.05] blur-[110px]" />
                <div className="absolute -bottom-24 left-1/4 h-[26rem] w-[26rem] rounded-full bg-navy/[0.04] blur-[95px]" />
                <div className="grid-lines absolute inset-0" data-tone="light" />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 md:px-8">
                {/* ── Section Header ── */}
                <Reveal className="mb-8">
                    <SectionHeading
                        index="07"
                        eyebrow="نخبة الشركاء"
                        tone="light"
                        align="center"
                        title={
                            <>
                                العلامات{" "}
                                <span className="gradient-text-gold">التجارية</span>
                            </>
                        }
                        description="نتعاون مع أبرز العلامات التجارية الموثوقة لتقديم منتجات وخدمات استثنائية تفوق التوقعات."
                    />
                </Reveal>

                <GoldDivider />

                {/* ── Brand Logos Grid ── */}
                <div
                    dir="ltr"
                    className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
                >
                    {brands.map((brand, index) => {
                        const hasUrl = Boolean(brand.url && brand.url.trim().length > 0);
                        const CardElement = hasUrl ? "a" : "div";

                        return (
                            <Reveal key={brand.name + index} delay={index * 70} y={20}>
                                <CardElement
                                    {...(hasUrl
                                        ? {
                                              href: brand.url,
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                          }
                                        : {})}
                                    className="group relative flex flex-col items-center"
                                    title={hasUrl ? `زيارة موقع ${brand.name}` : brand.name}
                                >
                                    {/* Main Brand Card */}
                                    <div
                                        style={motionVars(index)}
                                        className="anim-logo-float relative flex h-36 w-48 flex-col items-center justify-center rounded-2xl border border-gold/25 bg-white/90 p-6 shadow-[0_10px_30px_-15px_oklch(0.257_0.077_262.1/0.12)] backdrop-blur-md transition-all duration-500 hover:[animation-play-state:paused] group-hover:-translate-y-1 group-hover:border-gold/70 group-hover:shadow-[0_20px_45px_-12px_oklch(0.655_0.106_75.6/0.25)] md:h-40 md:w-56"
                                    >
                                        {/* External link indicator */}
                                        {hasUrl && (
                                            <span
                                                aria-hidden
                                                className="absolute top-3 right-3 text-gold/40 transition-colors duration-300 group-hover:text-gold"
                                            >
                                                <ExternalLink size={14} />
                                            </span>
                                        )}

                                        {/* Logo or Name */}
                                        {brand.logo ? (
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                loading="lazy"
                                                decoding="async"
                                                draggable={false}
                                                className="max-h-20 w-auto max-w-[85%] object-contain opacity-90 transition-all duration-500 group-hover:scale-108 group-hover:opacity-100 md:max-h-24"
                                            />
                                        ) : (
                                            <span className="font-mono text-xl font-bold tracking-wider text-navy/80 transition-colors duration-300 group-hover:text-navy">
                                                {brand.name}
                                            </span>
                                        )}

                                        {/* Logo Light Sweep Animation */}
                                        <span
                                            aria-hidden
                                            className="anim-logo-shine pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
                                            style={motionVars(index)}
                                        />
                                    </div>

                                    {/* Brand Label under card */}
                                    <span className="mt-3 text-sm font-semibold text-navy/70 transition-colors duration-300 group-hover:text-gold">
                                        {brand.name}
                                    </span>
                                </CardElement>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
