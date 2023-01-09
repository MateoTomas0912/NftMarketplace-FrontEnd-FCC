import { useQuery, gql } from "@apollo/client";

const _GET_ACTIVE_ITEM = gql`
  {
    activeItems(
      first: 5
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

export default function GraphExample() {
  const { loading, error, data } = useQuery(_GET_ACTIVE_ITEM);
  console.log(data);
}
