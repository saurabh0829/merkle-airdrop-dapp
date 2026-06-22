"use client";

import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider }                              from "wagmi";
import { QueryClient, QueryClientProvider }           from "@tanstack/react-query";
import { ThemeProvider, useTheme }                    from "next-themes";
import { config }                                     from "@/config/wagmi";
// @ts-expect-error: CSS module side-effect import without type declarations
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const RK_THEME_OPTIONS = {
    accentColor: "#7c3aed",
    accentColorForeground: "#fff",
    borderRadius: "large" as const,
};

function RainbowKitThemeWrapper({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const rkTheme = resolvedTheme === "dark"
        ? darkTheme(RK_THEME_OPTIONS)
        : lightTheme(RK_THEME_OPTIONS);

    return (
        <RainbowKitProvider theme={rkTheme} modalSize="compact">
            {children}
        </RainbowKitProvider>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitThemeWrapper>
                        {children}
                    </RainbowKitThemeWrapper>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
}
