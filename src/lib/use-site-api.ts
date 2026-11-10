import { useQuery } from "@tanstack/react-query";

function getApiEndpoint(): string {
    const envUrl = (import.meta.env as any).VITE_API_URL;
    if (envUrl) return envUrl;

    if (typeof window !== "undefined") {
        const { pathname } = window.location;
        if (pathname.startsWith("/SAUD-TRADING-EST/")) {
            return "/SAUD-TRADING-EST/admin/public_api.php";
        }
        return "/admin/public_api.php";
    }

    return "http://localhost/SAUD-TRADING-EST/admin/public_api.php";
}

export function useSiteApi() {
    return useQuery({
        queryKey: ["site-data"],
        queryFn: async ({ signal }) => {
            const res = await fetch(getApiEndpoint(), { signal });
            if (!res.ok) throw new Error("API " + res.status);
            return res.json();
        },
        staleTime: 60_000, // cache for 1 minute so dashboard changes reflect quickly
        retry: 1,
    });
}
