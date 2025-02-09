/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/hack_nyu.json`.
 */
export type HackNyu = {
  "address": "coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF",
  "metadata": {
    "name": "hackNyu",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "deleteProduct",
      "discriminator": [
        173,
        212,
        141,
        230,
        33,
        82,
        166,
        25
      ],
      "accounts": [
        {
          "name": "business",
          "writable": true,
          "signer": true
        },
        {
          "name": "product",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeProduct",
      "discriminator": [
        251,
        245,
        7,
        123,
        247,
        50,
        14,
        2
      ],
      "accounts": [
        {
          "name": "business",
          "writable": true,
          "signer": true
        },
        {
          "name": "product",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "productId",
          "type": "string"
        },
        {
          "name": "nfcTagHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateProduct",
      "discriminator": [
        139,
        180,
        241,
        126,
        123,
        240,
        13,
        224
      ],
      "accounts": [
        {
          "name": "business",
          "writable": true,
          "signer": true
        },
        {
          "name": "product",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "newNfcTagHash",
          "type": "string"
        }
      ]
    },
    {
      "name": "verifyProduct",
      "discriminator": [
        194,
        237,
        110,
        6,
        178,
        137,
        184,
        224
      ],
      "accounts": [
        {
          "name": "product"
        }
      ],
      "args": [
        {
          "name": "nfcTagHash",
          "type": "string"
        }
      ],
      "returns": "bool"
    }
  ],
  "accounts": [
    {
      "name": "product",
      "discriminator": [
        102,
        76,
        55,
        251,
        38,
        73,
        224,
        229
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized: You are not the owner of this product."
    }
  ],
  "types": [
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "productId",
            "type": "string"
          },
          {
            "name": "nfcTagHash",
            "type": "string"
          },
          {
            "name": "business",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
