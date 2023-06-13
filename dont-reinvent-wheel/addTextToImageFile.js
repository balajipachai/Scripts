const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// load image file
loadImage(`${process.cwd()}/image.jpg`).then((image) => {
  // create canvas
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  // draw image on canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // set font style and text
  ctx.font = '45px Arial';
  ctx.quality = 'best';
  ctx.fillStyle = '#008000';
  ctx.fillText('Batman', 100, 266);

  // save new image file
  const out = fs.createWriteStream('output.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('The PNG file was created.'));
});
