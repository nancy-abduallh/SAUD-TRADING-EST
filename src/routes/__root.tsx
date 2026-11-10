import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "مؤسسة سعود للتجارة | SAUD TRADING EST." },
        { name: "theme-color", content: "#060c1c" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { name: "google-site-verification", content: "GOOGLE_SITE_VERIFICATION_TOKEN" },
        { property: "og:site_name", content: "مؤسسة سعود للتجارة | SAUD TRADING EST." },
        { property: "og:locale", content: "ar_SA" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: "https://saud.ksaplatforms.com/" },
        { rel: "alternate", href: "https://saud.ksaplatforms.com/", hrefLang: "ar" },
        { rel: "alternate", href: "https://saud.ksaplatforms.com/", hrefLang: "x-default" },
        { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Space+Grotesk:wght@400;500;600&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Space+Grotesk:wght@400;500;600&display=swap",
        },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        {
          rel: "icon",
          href: "/icon-192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          rel: "icon",
          href: "/icon-512.png",
          type: "image/png",
          sizes: "512x512",
        },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://saud.ksaplatforms.com/#organization",
        "name": "مؤسسة سعود للتجارة",
        "alternateName": ["SAUD TRADING EST.", "سعود للتجارة"],
        "url": "https://saud.ksaplatforms.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://saud.ksaplatforms.com/icon-512.png",
          "width": 512,
          "height": 512,
        },
        "image": "https://saud.ksaplatforms.com/icon-512.png",
        "description":
          "حلول سعودية موثوقة لتوريد المواد الغذائية واللدائن البلاستيكية الخام، وخدمات رقمية متكاملة مدعومة بالذكاء الاصطناعي.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "الرياض",
          "addressCountry": "SA",
        },
        "areaServed": [
          { "@type": "Country", "name": "Saudi Arabia" },
          { "@type": "Country", "name": "Egypt" },
          { "@type": "Country", "name": "United Arab Emirates" },
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "availableLanguage": ["Arabic", "English"],
        },
        "knowsAbout": [
          "Food Commodities Supply",
          "Plastic Polymers & Industrial Packaging",
          "AI-Powered Digital Services & Media Production",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://saud.ksaplatforms.com/#website",
        "url": "https://saud.ksaplatforms.com/",
        "name": "سعود للتجارة | تجارة عالمية برؤية سعودية",
        "description":
          "حلول سعودية رائدة وموثوقة لتوريد المواد الغذائية والبلاستيكية والخدمات الرقمية المتكاملة بالذكاء الاصطناعي.",
        "inLanguage": "ar",
        "publisher": {
          "@id": "https://saud.ksaplatforms.com/#organization",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://saud.ksaplatforms.com/#webpage",
        "url": "https://saud.ksaplatforms.com/",
        "name": "سعود التجارية | تجارة عالمية وتوريد السلع الغذائية والمواد البلاستيكية والحلول الرقمية",
        "isPartOf": {
          "@id": "https://saud.ksaplatforms.com/#website",
        },
        "about": {
          "@id": "https://saud.ksaplatforms.com/#organization",
        },
        "description":
          "حلول سعودية موثوقة لتوريد المواد الغذائية واللدائن البلاستيكية الخام، وخدمات رقمية متكاملة مدعومة بالذكاء الاصطناعي.",
        "inLanguage": "ar",
      },
      {
        "@type": "ItemList",
        "@id": "https://saud.ksaplatforms.com/#sectors",
        "name": "قطاعات الأعمال الرئيسية في مؤسسة سعود للتجارة",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "قطاع اللدائن والبلاستيك",
            "description":
              "مواد خام موثقة المواصفات للصناعات التحويلية وحلول التعبئة والتغليف.",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "قطاع المواد الغذائية",
            "description":
              "سلع غذائية مختارة بعناية من مصادر دولية معتمدة تشمل الأرز، الحبوب، الزيوت النباتية، البقوليات والمكسرات.",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "قطاع الحلول الرقمية والإنتاج الإبداعي",
            "description":
              "منظومة رقمية متكاملة مدعومة بالذكاء الاصطناعي لتطوير المواقع والتسويق الرقمي والتغطيات الإعلامية.",
          },
        ],
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
