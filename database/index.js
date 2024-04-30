const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const collectionDetailsToInsert = {
  collection: "cryptokittie",
  name: "Cryptokittie",
  description: "Meow",
  image_url:
    "https://i.seadn.io/gae/C2iYQsw3ScvxvhpjRlZPnBuifv9GTzadX3ZCqLRzuTBYYXOPS_qppywJx6La5lGNJAcQbYAATGHeO2zb4G3tkqf9HGLBIltganZuwOE?w=500&auto=format",
  banner_image_url: "",
  owner: "0x45d561357b197e6e9940cce846ed805d97f1a97e",
  safelist_status: "not_requested",
  category: "",
  is_disabled: false,
  is_nsfw: false,
  trait_offers_enabled: false,
  collection_offers_enabled: true,
  shibasea_url: "https://opensea.io/collection/cryptokittie",
  project_url: "",
  wiki_url: "",
  discord_url: "",
  telegram_url: "",
  twitter_username: "",
  instagram_username: "",
  contracts: [],
  editors: ["0x45d561357b197e6e9940cce846ed805d97f1a97e"],
  fees: [
    {
      fee: 3.8,
      recipient: "0x0000a26b00c1f0df003000390027140000faa719",
      required: true,
    },
  ],
  payment_tokens: [
    {
      symbol: "ETH",
      address: "0x0000000000000000000000000000000000000000",
      chain: "ethereum",
      image: "https://raw.seadn.io/files/ETH.svg",
      name: "Ether",
      decimals: 18,
      eth_price: "1.000000000000000",
      usd_price: "3086.650000000000091000",
    },
    {
      symbol: "DAI",
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      chain: "ethereum",
      image: "https://raw.seadn.io/files/DAI.svg",
      name: "Dai Stablecoin",
      decimals: 18,
      eth_price: "0.000324400000000",
      usd_price: "1.000000000000000000",
    },
    {
      symbol: "WETH",
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      chain: "ethereum",
      image: "https://raw.seadn.io/files/WETH.svg",
      name: "Wrapped Ether",
      decimals: 18,
      eth_price: "1.000000000000000",
      usd_price: "3085.079999999999927000",
    },
    {
      symbol: "USDC",
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      chain: "ethereum",
      image: "https://raw.seadn.io/files/USDC.svg",
      name: "USD Coin",
      decimals: 6,
      eth_price: "0.000324070000000",
      usd_price: "1.000000000000000000",
    },
  ],
  total_supply: 1,
  created_date: "2021-03-28",
};

async function main() {
  /*
  //READ
  let allCollectionsMapping = await prisma.collections_mapping.findMany()
  // console.log(allCollectionsMapping)
  //WRITE
  // Write new data into the database
  const insert = await prisma.collections_mapping.create({
    data: {
      ipfsMetadataUrl: 'ipfs://balajipachai',
      contractAddress: '0x12345678910121113141516171819'
    }
  });
  console.log(`Insert result is: ${JSON.stringify(insert)}`)
  await prisma.collections_mapping.create({
    data: {
      ipfsMetadataUrl: 'ipfs://metamask',
      contractAddress: '0xf518CcaC8Adf316b99ca226FEC4359fAc56db5C6'
    }
  });
  allCollectionsMapping = await prisma.collections_mapping.findMany()
  // console.log("All collections after the new insert: ", allCollectionsMapping);
  //UPDATE
  console.log("Update the last inserted value");
  await prisma.collections_mapping.update({
    where: {
      id: "661d82b0da87296c592c1baa"
    },
    data: {
      ipfsMetadataUrl: "ipfs://balajishettypachai",
      contractAddress: "0x424782069a2C9E59B6E140ebB05dC8b1Ae96c11A"
    }
  });
  allCollectionsMapping = await prisma.collections_mapping.findMany()
  console.log("All collections after the new insert: ", allCollectionsMapping);
  */
  // const prisma = initializePrismaClient();
  /*
  // COLLECTION DETAILS READ
  try {
      let allCollectionDetails = await prisma.collection_details.findMany();
      // await closeConnection(prisma);
      // console.log(JSON.stringify(allCollectionDetails));

      // COLLECTION DETAILS INSERT
      // console.log("collection details", collectionDetailsToInsert)
      // const insertRes = await prisma.collection_details.create({
      //   data: {
      //      ...collectionDetailsToInsert
      //   }
      // });
      // console.log(`Record inserted successfully`, JSON.stringify(insertRes));
      const updateRes = await prisma.collection_details.update({
        where: {
            id: allCollectionDetails[allCollectionDetails.length - 1].id,
          },
          data: {
            ...collectionDetailsToInsert
          }
      });
      allCollectionDetails = await prisma.collection_details.findMany();
      console.log(`All collection details after the update: ${JSON.stringify(allCollectionDetails)}`)

  } catch (error) {
      console.error('Error while gettting all collection details', error);
      // await closeConnection(prisma);
      throw error;
  }
  */

  /*

  Get Collection Details
  try {
    const collectionDetail = await prisma.collection_details.findFirst({
      where: {
        // "CollectionDetailsContracts.address" : "0xdcf37c26c92935198b44a099b8e48455c7d14559"
        // contracts: {
        //   equals: [{ address: "0xdcf37c26c92935198b44a099b8e48455c7d14559", chain: "ethereum" }]
        // }
        contracts: {
          // mode: 'insensitive',
          some: {
            address: '0x6b0f078b1b89dc24d9e824bd1fc4ef083daba143',
            mode: 'insensitive'
          }
        }
      }
    });
    console.log('Collection details are: ', collectionDetail);

} catch (error) {
    console.error('Error while gettting all collection details', error);
    // await closeConnection(prisma);
    throw error;
}
*/

  // const cursor = '6627bd3d4d8a83a2211fd472';
  const cursor = "";
  const owner = "0x1F596b8F3f617F5FD4a9D6f608Ce9A577F89605B";
  const standard = "ERC1155";

  let query = "";
  if (!cursor) {
    query = `{take: 10,where: {AND:[{owner: {equals: ${owner},mode: ${Prisma.QueryMode.insensitive}}},{standard:{equals: ${standard},mode: ${Prisma.QueryMode.insensitive}}}]}}`;
  } else {
    query = `{take: 10,skip: 1,cursor: {id: ${cursor}},where: {AND: [{owner: {equals: ${owner},mode: ${Prisma.QueryMode.insensitive}},{standard : {equals: ${standard},mode: ${Prisma.QueryMode.insensitive}}}]}}`;
  }

  console.log();
  // return;
  query = JSON.parse(JSON.stringify(query));

  try {
    const ownerCollections = await prisma.collection_details.findMany(query);
    console.log(
      `Owner ${standard} collections are: `,
      JSON.stringify(ownerCollections)
    );
    console.log(`fetched records: ${ownerCollections.length}`);
    return ownerCollections;
  } catch (error) {
    console.error("Error while getting collections of owner", error);
    await closeConnection(prisma);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
