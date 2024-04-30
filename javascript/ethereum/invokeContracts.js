const Web3 = require("web3");
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

require("dotenv").config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const MAINNET_PROVIDER = process.env.MAINNET_PROVIDER;
const SENT_TX_PRIVATE_KEY = process.env.SENT_TX_PRIVATE_KEY;
const TOKENURI_PRIVATE_KEY = process.env.TOKENURI_PRIVATE_KEY;

const SNSABI = [
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32",
      },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidQueryRange",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "registerDate",
        type: "uint256",
      },
    ],
    name: "BlacklistedNameRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "GiveawayNameAssigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "registerDate",
        type: "uint256",
      },
    ],
    name: "GiveawayNameRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "registerDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_years",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "NameRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string[]",
        name: "name",
        type: "string[]",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "registerDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_years",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "NamesRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "registerDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "firstYearPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nextYearsPrice",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "string",
        name: "category",
        type: "string",
      },
    ],
    name: "PremiumNameRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "registerDate",
        type: "uint256",
      },
    ],
    name: "ReservedNameRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BLACKLIST_NAMES_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "D3_MINTER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GIVEAWAY_NAMES_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GLOBAL_DISCOUNT_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PREMIUM_NAMES_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESERVED_NAMES_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RESERVED_NAMES_WALLET_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SPECIAL_WALLET_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKEN_URI",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "YEARS_DISCOUNT_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "blockGiveawayName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
    ],
    name: "blockMultiGiveawayName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "_years",
        type: "uint256[]",
      },
    ],
    name: "bulkRegisterName",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_years",
        type: "uint256",
      },
    ],
    name: "calculatePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "enum SNS.SpecialName",
        name: "_type",
        type: "uint8",
      },
    ],
    name: "deleteSpecialName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "explicitOwnershipOf",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "startTimestamp",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "burned",
            type: "bool",
          },
          {
            internalType: "uint24",
            name: "extraData",
            type: "uint24",
          },
        ],
        internalType: "struct IERC721AUpgradeable.TokenOwnership",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "explicitOwnershipsOf",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "startTimestamp",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "burned",
            type: "bool",
          },
          {
            internalType: "uint24",
            name: "extraData",
            type: "uint24",
          },
        ],
        internalType: "struct IERC721AUpgradeable.TokenOwnership[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getPremiumName",
    outputs: [
      {
        internalType: "uint256",
        name: "firstYearPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nextYearsPrice",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "globalDiscount",
    outputs: [
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint16",
        name: "discountPercentage",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseURI_",
        type: "string",
      },
      {
        internalType: "address",
        name: "_price",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenUriAddr",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isBlocked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "isValid",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
      {
        internalType: "string",
        name: "errMsg",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "nameOf",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "names",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "noYears",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "purchaseDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "contract IPrice",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "_years",
        type: "uint256[]",
      },
    ],
    name: "privateBulkRegisterName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_years",
        type: "uint256",
      },
    ],
    name: "registerName",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setBlacklistName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "val",
        type: "bool",
      },
      {
        internalType: "uint16",
        name: "percentage",
        type: "uint16",
      },
    ],
    name: "setGlobalDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "val",
        type: "bool",
      },
    ],
    name: "setIsBlocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
    ],
    name: "setMultiBlacklistName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "setMultiGiveawayName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "firstYearPrices",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "nextYearsPrices",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "categories",
        type: "string[]",
      },
    ],
    name: "setMultiPremiumName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
    ],
    name: "setMultiReservedName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "firstYearPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nextYearsPrice",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
    ],
    name: "setPremiumName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_price",
        type: "address",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setReservedName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "setUserForGiveawayName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "val",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_years",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "percentage",
        type: "uint16",
      },
    ],
    name: "setYearsDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "tokenOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "tokensOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stop",
        type: "uint256",
      },
    ],
    name: "tokensOfOwnerIn",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "yearsDiscount",
    outputs: [
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_years",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "discountPercentage",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const MOCKSNSABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ERC721EnumerableForbiddenBatchMint",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ERC721OutOfBoundsIndex",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const MOCKPRICEABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "getPricePerYear",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const MARKETPLACE_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "DealExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "DealNotExists",
    type: "error",
  },
  {
    inputs: [],
    name: "DealNotOpen",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCurrency",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxDealsExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "NotNFTOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlySellerCanCancel",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldCommission",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newCommission",
        type: "uint256",
      },
    ],
    name: "CommissionChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "DealCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "DealClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
    ],
    name: "DealCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "cancelDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "dealIds",
        type: "uint256[]",
      },
    ],
    name: "closeBulkDeals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "erc20Address",
        type: "address",
      },
    ],
    name: "closeDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "commission",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "createDeal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deals",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isOpen",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxCommission",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxDuration",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCommission",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextDealId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newCommission",
        type: "uint256",
      },
    ],
    name: "setCommission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMaxDuration",
        type: "uint256",
      },
    ],
    name: "setMaxDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "dealId",
        type: "uint256",
      },
    ],
    name: "viewDeal",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftAddress",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isOpen",
            type: "bool",
          },
        ],
        internalType: "struct Marketplace.Deal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const getProxyContractDeployedAddress = async (txHash) => {
  try {
    const web3 = new Web3(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    const lastIndex = receipt.logs.length - 1;
    const topicsLength = receipt.logs[lastIndex].topics.length;
    const topics = [];

    for (let index = 1; index < topicsLength; index++) {
      console.log(`topics ${index} = ${receipt.logs[lastIndex].topics[index]}`);
      topics.push(receipt.logs[lastIndex].topics[index]);
    }
    // const topics = [receipt.logs[lastIndex].topics[1], receipt.logs[lastIndex].topics[2]];
    const eventData = web3.eth.abi.decodeLog(
      [
        {
          type: "address",
          name: "instance",
          indexed: true,
        },
        {
          type: "address",
          name: "creator",
          indexed: true,
        },
      ],
      receipt.logs[lastIndex].data,
      topics
    );
    console.log("event data is: ", eventData);
    return eventData.instance;
  } catch (err) {
    console.error("Error in getProxyContractDeployedAddress: ", err);
    throw err;
  }
};

const mintSNSOnSepolia = async () => {
  const snsShibariumAddr = "0x9aCB9c23334E2b9Eda9C301F23cE42e3DC378D35";
  const snsSepoliaAddr = "0x0ef0495B408077A4B5Af388630590F2522a7e41D";
  const web3 = new Web3(MAINNET_PROVIDER); // Shibarium Mainnet
  const mainnetSNSContract = new web3.eth.Contract(SNSABI, snsShibariumAddr);

  const testnetWeb3 = new Web3(
    `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
  ); // Sepolia Testnet
  const testnetSNSContract = new testnetWeb3.eth.Contract(
    SNSABI,
    snsSepoliaAddr
  );
  const ids = [];
  for (let index = 77; index < 101; index++) {
    ids.push(index);
  }

  const privateKey = SENT_TX_PRIVATE_KEY;
  const tokenURIPrivateKey = TOKENURI_PRIVATE_KEY;

  let uri;

  for (const id of ids) {
    console.log("Token id::::::::::::::", id);
    const tokenId = id;
    let name;
    let years;

    if (id % 2 == 0) {
      years = 2;
    } else if (id % 3 == 0) {
      years = 5;
    } else {
      years = 10;
    }
    uri = await mainnetSNSContract.methods.tokenURI(tokenId).call();
    const metadata = (await axios.get(uri)).data;
    const tokenuri = uri.split("/")[4];
    console.log(`TokenURI from Shibarium mainnet: ${tokenuri}`);
    console.log(`SNS name: ${metadata.name}`);
    // console.log("token uri is : ", uri);
    // console.log()
    // console.log("Testnet read: ", await testnetSNSContract.methods.name().call());
    // const txhash = await testnetSNSContract.methods.safeMint().send({from: "0xf518CcaC8Adf316b99ca226FEC4359fAc56db5C6"});
    let data = testnetSNSContract.methods
      .registerName(metadata.name.split("*")[0], years)
      .encodeABI();
    let tx = {
      to: snsSepoliaAddr,
      data,
      gasLimit: "0x2dc6c0",
    };
    let signed = await testnetWeb3.eth.accounts.signTransaction(tx, privateKey);
    console.log(
      "*****************Register name transaction signed*************"
    );
    let receipt = await testnetWeb3.eth.sendSignedTransaction(
      signed.rawTransaction
    );
    console.log("Register name transaction receipt: ", JSON.stringify(receipt));

    data = testnetSNSContract.methods.setTokenURI(id, tokenuri).encodeABI();
    tx = {
      to: snsSepoliaAddr,
      data,
      gasLimit: "0x2dc6c0",
    };
    signed = await testnetWeb3.eth.accounts.signTransaction(
      tx,
      tokenURIPrivateKey
    );
    console.log(
      "*****************Set token uri transaction signed*************"
    );
    receipt = await testnetWeb3.eth.sendSignedTransaction(
      signed.rawTransaction
    );
    console.log("Set token uri transaction receipt: ", JSON.stringify(receipt));

    console.log(
      `TokenURI of tokenId ${id} = ${await testnetSNSContract.methods
        .tokenURI(id)
        .call()}`
    );
  }
};

const getMarketPlaceDetails = async () => {
  const marketplaceSepoliaAddress =
    "0xd80c1eB49d90a7FdbA69BE1abf6CA051285c4Dd2";
  const testnetWeb3 = new Web3(
    `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
  ); // Sepolia Testnet
  const marketplaceContract = new testnetWeb3.eth.Contract(
    MARKETPLACE_ABI,
    marketplaceSepoliaAddress
  );
  const commission = await marketplaceContract.methods.commission().call();
  console.log(`Commission in marketplace contract is: ${commission}`);

  const maxCommission = await marketplaceContract.methods
    .maxCommission()
    .call();
  console.log(`Commission in marketplace contract is: ${maxCommission}`);

  const maxDuration = await marketplaceContract.methods.maxDuration().call();
  console.log(`Commission in marketplace contract is: ${maxDuration}`);

  const owner = await marketplaceContract.methods.owner().call();
  console.log(`Commission in marketplace contract is: ${owner}`);

  const nextDealId = await marketplaceContract.methods.nextDealId().call();
  console.log(`Commission in marketplace contract is: ${nextDealId}`);

  const viewDeal = await marketplaceContract.methods
    .viewDeal(nextDealId)
    .call();
  console.log(`Commission in marketplace contract is: ${viewDeal}`);
};

const testGraphQL = async (first, last) => {
  let APIURL =
    "https://api.studio.thegraph.com/query/70515/shibadrop-v1/version/latest";
  const allERC721CollectionsQuery = `
  query($first: Int!, $skip: Int!) {
    newInstances(orderBy: blockNumber, orderDirection: asc, first:$first, skip:$skip) {
      instance
      name
      symbol
      creator
      type
      standard
      blockNumber
      blockTimestamp
    }
  }`;
  // // console.log(first, last)
  // // console.log(Number(first), Number(last))
  let variables = { first, skip: last };
  let client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  let data = await client.query({
    query: gql(allERC721CollectionsQuery),
    variables,
  });
  console.log(`Fetched data is: `, JSON.stringify(data));
  const  =
    "https://api.studio.thegraph.com/query/70515/shibadrop-v1/version/latest";
  variables = {
    creator: "0xf518ccac8adf316b99ca226fec4359fac56db5c6",
    first,
    skip: last,
  };
  const ownerERC721CollectionsQuery = `
    query($creator: String!, $first: Int!, $skip: Int!) {
      newInstances(orderBy: blockNumber, orderDirection: asc, first:$first, skip:$skip, where: { creator: $creator }) {
        instance
        name
        symbol
        creator
        type
        standard
        blockNumber
        blockTimestamp
      }
    }`;
  console.log(first, last);
  console.log(Number(first), Number(last));
  variables = { first, skip: last };
  client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  data = await client.query({
    query: gql(ownerERC721CollectionsQuery),
    variables,
  });
  console.log(`Fetched data is: `, JSON.stringify(data));
  ERC1155;
  APIURL =
    "https://api.studio.thegraph.com/query/70515/shibadrop-erc1155/version/latest";
  variables = { first, skip: last };
  const allERC1155CollectionsQuery = `
    query($first: Int!, $skip: Int!) {
      newInstance1155S(orderBy: blockNumber, orderDirection: asc, first:$first, skip:$skip) {
        instance
        name
        symbol
        creator
        type
        standard
        blockNumber
        blockTimestamp
      }
    }`;
  client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  data = await client.query({
    query: gql(allERC1155CollectionsQuery),
    variables,
  });
  console.log(`Fetched data is: `, JSON.stringify(data));
  APIURL =
    "https://api.studio.thegraph.com/query/70515/shibadrop-erc1155/version/latest";
  // variables = { creator: "0xf518ccac8adf316b99ca226fec4359fac56db5c6" };
  variables = {
    creator: "0xf518ccac8adf316b99ca226fec4359fac56db5c6",
    first,
    skip: last,
  };
  const ownerERC1155CollectionsQuery = `
          query($creator: String!, $first: Int!, $skip: Int!) {
            newInstance1155S(orderBy: blockNumber, orderDirection: asc, first:$first, skip:$skip, where: { creator: $creator }) {
              instance
              name
              symbol
              creator
              type
              standard
              blockNumber
              blockTimestamp
            }
          }`;
  client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  data = await client.query({
    query: gql(ownerERC1155CollectionsQuery),
    variables,
  });
  console.log(`Fetched data is: `, JSON.stringify(data));
};

const getCollectionDetails = async (id) => {
  const prisma = new PrismaClient();
  try {
    const collectionDetail = await prisma.collection_details.findFirst({
      where: { id },
    });
    console.log("Disconnecting database connection...");
    await prisma.$disconnect();
    console.log("Database disconnected...");
    console.log("Collection details are: ", collectionDetail);
    return collectionDetail;
  } catch (error) {
    console.error("Error while getting collection detail", error);
    console.log("Disconnecting database connection...");
    await prisma.$disconnect();
    console.log("Database disconnected...");
    throw error;
  }
};

// testGraphQL(2, 1);

// mintMockSNS();

// getProxyContractDeployedAddress('0xec4fbbf783a2e8021f8c7236cf1077f0bd27e4c802de821f260832b07e0cf39e'); // ERC1155
// getProxyContractDeployedAddress('0x0c9a3bcd193dbfc53ed6f1cb5bb112a387f920da0d7ddc9e69e85c65b8ef9966'); // ERC721
// getCollectionDetails('6627c22156f67d99654da06f')

// mintSNSOnSepolia()

getMarketPlaceDetails();
