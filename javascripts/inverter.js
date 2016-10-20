onmessage = function(e) {
  var data = e.data.image_data.data; // get context image data

  for (var i = 0; i < data.length; i += 4) {
    for (var j = 0; j < 3; j++) { // iterate through red, green, and blue channels of each pixel
      data[i + j] = 255 - data[i + j]; // invert value
    }
  }
  postMessage(e.data);
}
