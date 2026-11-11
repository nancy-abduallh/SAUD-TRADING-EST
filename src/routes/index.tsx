import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

import { Navbar } from "@/components/sections/Navbar";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { StatsBar } from "@/components/sections/StatsBar";
import { SectorsGrid } from "@/components/sections/SectorsGrid";
import { VisionValues } from "@/components/sections/VisionValues";
import { DigitalEcosystem } from "@/components/sections/DigitalEcosystem";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RiyadhLocations } from "@/components/sections/RiyadhLocations";
import { Footer } from "@/components/sections/Footer";
import { sectors, type CategoryName, type SectorKey } from "@/lib/site-data";

// ── Code-split the two heaviest sections ────────────────────────────────────
// Catalogue pulls in ~57 product images; ClientsMarquee pulls in ~11 logos.
const Catalogue = lazy(() =>
    import("@/components/sections/Catalogue").then((m) => ({ default: m.Catalogue })),
);
const ClientsMarquee = lazy(() =>
    import("@/components/sections/ClientsMarquee").then((m) => ({ default: m.ClientsMarquee })),
);

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "سعود التجارية | تجارة عالمية وتوريد السلع الغذائية والمواد البلاستيكية والحلول الرقمية" },
            {
                name: "description",
                content:
                    "مؤسسة سعود للتجارة - حلول سعودية رائدة وموثوقة لتوريد المواد الغذائية واللدائن البلاستيكية الخام، وخدمات رقمية وإعلامية متكاملة مدعومة بالذكاء الاصطناعي لمواكبة رؤية 2030.",
            },
            {
                name: "keywords",
                content:
                    "سعود التجارية, مؤسسة سعود للتجارة, توريد مواد غذائية, بوليمرات بلاستيكية, تجارة عالمية السعودية, فروع الرياض, السويدي, الروضة, النرجس, العارض, حلول رقمية ذكاء اصطناعي, سلاسل إمداد, SAUD TRADING",
            },
            { property: "og:title", content: "سعود التجارية | تجارة عالمية وتوريد السلع الغذائية والمواد البلاستيكية والحلول الرقمية" },
            {
                property: "og:description",
                content: "حلول سعودية رائدة وموثوقة لتوريد المواد الغذائية واللدائن البلاستيكية والخدمات الرقمية المتكاملة بالذكاء الاصطناعي.",
            },
            { property: "og:url", content: "https://saud.ksaplatforms.com/" },
            { property: "og:image", content: "https://saud.ksaplatforms.com/icon-512.png" },
            { property: "og:image:width", content: "512" },
            { property: "og:image:height", content: "512" },
            { property: "og:image:alt", content: "شعار مؤسسة سعود للتجارة" },
            { property: "og:type", content: "website" },
            { property: "og:locale", content: "ar_SA" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "سعود التجارية | تجارة عالمية وتوريد المواد الغذائية والبلاستيكية" },
            {
                name: "twitter:description",
                content: "حلول سعودية رائدة وموثوقة لتوريد السلع الغذائية والمواد البلاستيكية والحلول الرقمية.",
            },
            { name: "twitter:image", content: "https://saud.ksaplatforms.com/icon-512.png" },
        ],
        links: [
            { rel: "canonical", href: "https://saud.ksaplatforms.com/" },
        ],
    }),
    component: IndexPage,
});

function IndexPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sectorKey, setSectorKey] = useState<SectorKey>("food");
    const [category, setCategory] = useState<CategoryName>("زيوت طعام");

    const selectSector = (key: SectorKey) => {
        setSectorKey(key);
        setCategory(sectors[key].categories[0] as CategoryName);
        const el = document.getElementById("catalogue");
        if (el) {
            const headerOffset = window.innerWidth >= 768 ? 80 : 68;
            const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
    };

    const changeSector = (key: SectorKey) => {
        setSectorKey(key);
        setCategory(sectors[key].categories[0] as CategoryName);
    };

    // Smoothly scroll to initial hash target if present in URL on load
    useEffect(() => {
        if (typeof window !== "undefined" && window.location.hash) {
            const hash = window.location.hash.replace(/^#/, "");
            if (hash) {
                const timer = setTimeout(() => {
                    const el = document.getElementById(hash);
                    if (el) {
                        const headerOffset = window.innerWidth >= 768 ? 80 : 68;
                        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
                    }
                }, 150);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    return (
        <main className="relative min-h-screen overflow-x-hidden bg-pearl text-ink" dir="rtl">
            {/* Top Anchor */}
            <div id="top" className="absolute top-0 start-0 pointer-events-none" />

            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <HeroSlider />
            <StatsBar />

            {/* Sections */}
            <SectorsGrid onSelect={selectSector} />

            <Suspense fallback={<div id="catalogue" className="min-h-[500px] bg-ink" />}>
                <Catalogue
                    sectorKey={sectorKey}
                    category={category}
                    setCategory={setCategory}
                    onSectorChange={changeSector}
                />
            </Suspense>

            <VisionValues />
            <DigitalEcosystem />
            <ComparisonTable />

            <Suspense fallback={<div id="clients" className="min-h-[400px] bg-ink" />}>
                <ClientsMarquee />
            </Suspense>

            <BrandsSection />
            <AboutSection />
            <RiyadhLocations />
            <Footer />
        </main>
    );
}
