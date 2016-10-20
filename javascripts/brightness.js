onmessage = function(e) {
  var data = e.data.image_data.data,
      brightness_value = Math.floor(255 * +e.data.param / 100);

  for (var i = 0; i < data.length; i += 4) {
    data[i] += brightness_value; // add brightness_value to red, green, and blue channels
    data[i + 1] += brightness_value;
    data[i + 2] += brightness_value;
  }
  postMessage(e.data);
};
