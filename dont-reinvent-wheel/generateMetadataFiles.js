const fs = require('fs');

/* 
For each tokenId:
{
  name: "Balaji Shetty Pachai",
  image: "https://www.linkedin.com/in/balaji-shetty-pachai/",
  external_url: "https://twitter.com/balaji_pachai",
  serialNumber: "0001",
  description: "Balaji Shetty Pachai is Blockchain Engineer",
}
*/

const jsonObject = {
  name: "", // REQUIRED, CANNOT BE EMPTY
  image: "", // REQUIRED, CANNOT BE EMPTY
  external_url: "https://twitter.com/balaji_pachai",
  serialNumber: "",
  description: "Balaji Shetty Pachai is Blockchain Engineer", // REQUIRED, CANNOT BE EMPTY
};

// REPLACE BELOW LINE WITH THE CONTENT-ID OF ## After generating images, point number 4
const imageBaseURL = 'ipfs://{{CONTENT-ID}}';
const start = 1;
const end = 10;
for (let index = start; index <= end; index += 1) {
  jsonObject.name = "Balaji Shetty Pachai";
  jsonObject.serialNumber = `${index.toString().padStart(2, '0')}`;
  jsonObject.image = `${imageBaseURL}/${index}.png`;

  const text = JSON.stringify(jsonObject);
  fs.writeFile(`./metadata/${index}`, text, (err) => {
    if (err) throw err;
    console.log('File created successfully');
  });
}
