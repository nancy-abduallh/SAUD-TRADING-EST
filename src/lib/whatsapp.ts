/**
 * Formats a phone number or link into a valid WhatsApp click-to-chat URL.
 * Handles:
 * - Direct numbers: +966500000000, 0500000000, 966500000000
 * - Existing wa.me or api.whatsapp.com links
 * - Optional pre-filled messages
 */
export function getWhatsAppUrl(value?: string | null, message?: string): string {
    const trimmed = (value || "").trim();
    if (!trimmed) {
        return "#contact";
    }

    let baseUrl = "";
    if (/^(https?:)?\/\//i.test(trimmed)) {
        baseUrl = trimmed;
    } else {
        const digits = trimmed.replace(/\D/g, "");
        if (!digits) return "#contact";
        // If Saudi national mobile format starting with 05
        const phone = digits.startsWith("05") ? "966" + digits.slice(1) : digits;
        baseUrl = `https://wa.me/${phone}`;
    }

    if (message) {
        const separator = baseUrl.includes("?") ? "&" : "?";
        return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
    }

    return baseUrl;
}

export function isExternalUrl(url: string): boolean {
    return /^https?:\/\//i.test(url);
}
