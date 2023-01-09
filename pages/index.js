import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisQuery } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEM from "../constants/SubGraphQuerys";
import { useQuery } from "@apollo/client";
import { Loading } from "web3uikit";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainIdString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = networkMapping[chainIdString].NftMarketplace[0];

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEM);

  return (
    <div className="container hm-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              const { price, nftAddress, tokenId, seller } = nft;
              return marketplaceAddress ? (
                <div>
                  <NFTBox
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marketplaceAddress={marketplaceAddress}
                    seller={seller}
                    key={`${nftAddress}${tokenId}`}
                  />
                </div>
              ) : (
                <div>Network error, please switch to a valid network</div>
              );
            })
          )
        ) : (
          <div>Web3 not available</div>
        )}
      </div>
    </div>
  );
}
