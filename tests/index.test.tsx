import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { WagmiProvider, createConfig, useConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";
import { http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Works", () => {
  it("should work", () => {
    render(
      <WagmiProvider
        config={createConfig({
          chains: [mainnet],
          transports: { [mainnet.id]: http() },
        })}
      >
        <QueryClientProvider client={queryClient}>
          <TestComponent />

          {/* error thrown here */}
          <RainbowKitProvider>
            <p>Hello World</p>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );

    expect(1 + 1).toBe(2);
  });
});

const TestComponent = () => {
  // this works as expected, error is not thrown
  useConfig();

  return null;
};
