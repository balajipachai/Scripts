**The directory contains scripts which are handy to generate images and metadata files which are later on uploaded to IPFS storage.**

## Pre-requisite

1. The image in which text has to be added must be named `image.{jpeg/png/anything}`.
2. Ensure the above image name is the same in `addTextToImage.js L:5 & generateImageFiles.js L:5`
3. The text can be added by changing `addTextToImage.js L:20`
4. Execute `node addTextToImage.js` which will add your text to `image..{jpeg/png/anything}` file and store it in `output.png` file.
5. To change the location of the text, adjust the `widht & height at ctx.fillText(text, W, H)`.
6. Once you are satisfied with the location of the text, then you can generate a series of such images using `node generateImageFiles.js`

## Why this is needed?

1. When you create an ERC721/NFT smart contract, then each tokenId has metadata information that gives more details about the token being minted.
2. The metadata is a JSON object that contains any number of key-value pairs, however, for NFTs the object must have `name, description & image` key-values compulsoraily.
3. Let us imagine you want to launch an NFT smart contract with 10000 unique tokens.

    3.1 Here you will need 10000 images and 10000 JSON objects
    3.2 If you go on copy pasting files manually then the task would be accomplished but you would have lost quite considerable amount of time.
    3.3 Else, you can make use of the scripts that are available in this project, which is less tedious, time saving and can be accomplished with a couple of changes in the script files.

## Steps to generate image file

1. Copy the image in `image.{jpeg/png/anything}` the root directory.
2. Open `addTextToImage.js` update `Line Number: 5`
3. Run `node addTextToImage.js`
4. See the output in `output.png`
5. If you are satisfied with the text location, DONE
6. If not change the width and height as stated in `Pre-requisite's point number 5`
7. To generate multiple images edit `for (let index = start; index <= end; index += 1) {...` and specify the values for `start` & `end`, this would generate images under `images directory` having names as `1, 2, 3, .... upto end`

## After generating images

1. `npm i -g ipfs-car`
2. `npx ipfs-car pack images/ --output images.car` [Content Archived File - CAR]
3. Upload the `images.car` file to `NFT.Storage`
4. Grab the `ContentID`
5. Now it's time to generate the metadata:
    
    5.1. Add the required `key-value` pairs for the required JSON object in `generateMetadataFiles.js`
6. It's time to generate the metadata files
7. Run `node generateMetadataFiles.js`

    7.1 `npx ipfs-car pack metadata/ --output metadata.car` [Content Archived File - CAR]

    7.2 Upload the `metadata.car` file to `NFT.Storage`

    7.3 Grab the `ContentID`

8. Go to the NFT Contract and update `baseURI = ipfs://{ContentID}/` ContentID should be taken from Step: 7.3
9. Bingo, you're done, now go and start issuing NFTs to see your awesome NFT images in Metamask or any other wallet.

Happy Learning!!!!!!