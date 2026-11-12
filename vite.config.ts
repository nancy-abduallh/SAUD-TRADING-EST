import { fileURLToPath } from "node:url";

import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const googleToken =
    process.env.GOOGLE_SITE_VERIFICATION_TOKEN ||
    env.GOOGLE_SITE_VERIFICATION_TOKEN ||
    env.VITE_GOOGLE_SITE_VERIFICATION_TOKEN ||
    "";

  return {
    define: {
      "process.env.GOOGLE_SITE_VERIFICATION_TOKEN": JSON.stringify(googleToken),
    },
    server: {
      host: true, // all interfaces (IPv4-safe; "::" fails on machines without IPv6)
      port: 8080,
      // don't let the dev server watch the PHP admin, uploads, cache or image backups
      watch: {
        ignored: ["**/admin/**", "**/originals-backup/**", "**/node_modules/**"],
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
        prerender: {
          enabled: true,
        },
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
      }),
      nitro({ preset: (process.env["NITRO_PRESET"] as any) || "node-server" }),
      viteReact(),
    ],
  };
});
