// ██╗███╗   ███╗ ██████╗     ██████╗ ███████╗███████╗██╗███████╗███████╗██████╗
// ██║████╗ ████║██╔════╝     ██╔══██╗██╔════╝██╔════╝██║╚══███╔╝██╔════╝██╔══██╗
// ██║██╔████╔██║██║  ███╗    ██████╔╝█████╗  ███████╗██║  ███╔╝ █████╗  ██████╔╝
// ██║██║╚██╔╝██║██║   ██║    ██╔══██╗██╔══╝  ╚════██║██║ ███╔╝  ██╔══╝  ██╔══██╗
// ██║██║ ╚═╝ ██║╚██████╔╝    ██║  ██║███████╗███████║██║███████╗███████╗██║  ██║
// ╚═╝╚═╝     ╚═╝ ╚═════╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝

const sharp = require("sharp");
const fs = require("fs");

//                   __ _
//   ___ ___  _ __  / _(_) __ _
//  / __/ _ \| '_ \| |_| |/ _` |
// | (_| (_) | | | |  _| | (_| |
//  \___\___/|_| |_|_| |_|\__, |
//                        |___/
const MAX_DIMENSION = 400;
const MAX_IMG_WIDTH = MAX_DIMENSION;
const MAX_IMG_HEIGHT = MAX_DIMENSION;
const INPUT_FOLDER = "input/";
const OUTPUT_FOLDER = "output/";

//                     _    __ _ _
//  _ __ ___  __ _  __| |  / _(_) | ___  ___
// | '__/ _ \/ _` |/ _` | | |_| | |/ _ \/ __|
// | | |  __/ (_| | (_| | |  _| | |  __/\__ \
// |_|  \___|\__,_|\__,_| |_| |_|_|\___||___/
const images_array = [];
fs.readdirSync(INPUT_FOLDER).forEach(file => {
  images_array.push(file);
});
const images_array_length = images_array.length;

//                _           _           _       _
//  _ __ ___  ___(_)_______  | |__   __ _| |_ ___| |__
// | '__/ _ \/ __| |_  / _ \ | '_ \ / _` | __/ __| '_ \
// | | |  __/\__ \ |/ /  __/ | |_) | (_| | || (__| | | |
// |_|  \___||___/_/___\___| |_.__/ \__,_|\__\___|_| |_|
resizeImages = _index => {
  if (!_index) _index = 0;
  let _path = images_array[_index];
  console.log("resizing ", _path);
  sharp(`${INPUT_FOLDER}${_path}`)
    .resize(MAX_IMG_WIDTH, MAX_IMG_HEIGHT, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toFile(`${OUTPUT_FOLDER}${_path}`, function(err) {
      if (err) {
        console.log(`error with file ${_path}`, err);
      }
      if (_index < images_array_length - 1) {
        resizeImages(_index + 1);
      }
    });
};
resizeImages();
