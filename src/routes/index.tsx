import { createFileRoute } from "@tanstack/react-router";
import { lazy, useState } from "react";

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
import { LazySection } from "@/components/effects/LazySection";
import { sectors, type CategoryName, type SectorKey } from "@/lib/site-data";

// ── Code-split the two heaviest sections ────────────────────────────────────
// Catalogue pulls in ~57 product images; ClientsMarquee pulls in ~11 logos.
// Their JS chunks only download when the section enters the viewport.
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
    component: Index,
});

function Index() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sectorKey, setSectorKey] = useState<SectorKey>("food");
    const [category, setCategory] = useState<CategoryName>("الأرز والحبوب");

    const selectSector = (key: SectorKey) => {
        setSectorKey(key);
        setCategory(sectors[key].categories[0] as CategoryName);
        requestAnimationFrame(() => document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }));
    };

    const changeSector = (key: SectorKey) => {
        setSectorKey(key);
        setCategory(sectors[key].categories[0] as CategoryName);
    };

    return (
        <main className="min-h-screen overflow-x-hidden bg-pearl text-ink" dir="rtl">
            {/* ── Above the fold — rendered eagerly during SSR ── */}
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <HeroSlider />
            <StatsBar />

            {/* ── Below the fold — deferred until approaching viewport ── */}
            <LazySection minHeight="700px" id="sectors">
                <SectorsGrid onSelect={selectSector} />
            </LazySection>
            <LazySection minHeight="800px" id="catalogue">
                <Catalogue sectorKey={sectorKey} category={category} setCategory={setCategory} onSectorChange={changeSector} />
            </LazySection>
            <LazySection minHeight="600px" id="vision">
                <VisionValues />
            </LazySection>
            <LazySection minHeight="600px" id="digital">
                <DigitalEcosystem />
            </LazySection>
            <LazySection minHeight="500px" id="compare">
                <ComparisonTable />
            </LazySection>
            <LazySection minHeight="500px" id="clients">
                <ClientsMarquee />
            </LazySection>
            <BrandsSection />
            <LazySection minHeight="500px" id="about">
                <AboutSection />
            </LazySection>
                        <LazySection minHeight="550px" id="locations">
                <RiyadhLocations />
            </LazySection>
            <LazySection minHeight="400px" id="contact">
                <Footer />
            </LazySection>
        </main>
    );
}