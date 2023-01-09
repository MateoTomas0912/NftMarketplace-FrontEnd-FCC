import { useState } from "react";
import { Modal, Input, useNotification } from "web3uikit";
import { useWeb3Contract } from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import { ethers } from "ethers";

export default function UpdateListingModal({
  nftAddress,
  tokenId,
  isVisible,
  marketplaceAddress,
  onClose,
}) {
  const [priceToUpdate, setPriceToUpdate] = useState(0);
  const dispatch = useNotification();

  const handleUpdateListingSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "listing update",
      title: "Listing Updated - Please refresh",
      position: "topR",
    });
    onClose && onClose();
    setPriceToUpdate("0");
  };

  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(priceToUpdate || "0"),
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={(event) => {
        updateListing({
          onError: (error) => console.log(error),
          onSuccess: handleUpdateListingSuccess,
        });
      }}
    >
      <Input
        label="Update listing price in L1 currency (ETH)"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdate(event.target.value);
        }}
      ></Input>
    </Modal>
  );
}
