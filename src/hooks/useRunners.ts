import { jsonRpcProvider } from "@/constants/provider";
import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from "ethers";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

const useRunners = () => {
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
    const { walletProvider }: any = useAppKitProvider("eip155");

    const provider = useMemo(() => {
        if (walletProvider) {
            return new BrowserProvider(walletProvider);
        }
        return jsonRpcProvider; // Fallback to read-only provider (Infura on Sepolia)
    }, [walletProvider]);

    const debouncedFetchSigner = debounce(async (provider: BrowserProvider | JsonRpcProvider) => {
        try {
            const newSigner = await provider.getSigner();
            if (!signer || newSigner.address !== signer.address) {
                setSigner(newSigner);
            }
        } catch (error:any) {
            console.error("Error fetching signer:", error);
            if (error.code === 429) {
                // Implement logic to handle rate limiting, e.g., exponential backoff
                console.error("Rate limit reached. Please try again later.");
            }
        }
    }, 1000); // Increased debounce time to 1000ms

    useEffect(() => {
        if (!provider || provider === jsonRpcProvider) {
            setSigner(null);
            return;
        }

        debouncedFetchSigner(provider);
        return () => {
            debouncedFetchSigner.cancel();
        };
    }, [provider]);

    return { provider, signer, readOnlyProvider: jsonRpcProvider };
};

export default useRunners;
