const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// load image file
loadImage(`${process.cwd()}/image.jpg`).then((image) => {
  const start = 1;
  const end = 10;
  for (let index = start; index <= end; index += 1) {
    // create canvas
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    const text = `Batman ${index.toString()}`;

    // draw image on canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // set font style and text
    ctx.font = '45px Arial';
    ctx.fillStyle = '#008000';
    ctx.quality = 'best';
    ctx.fillText(text, 100, 266);

    // save new image file
    const out = fs.createWriteStream(`${process.cwd()}/images/${index}.png`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
      ctx.clearRect(0, 0, image.width, image.height);
      console.log('The PNG file was created.');
    });
  }
});
