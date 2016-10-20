onmessage = function(e) {
  var data = e.data.image_data.data,
      cols = e.data.image_data.width, // pixel width
      rows = e.data.image_data.height, // pixel height
      new_row, current_row;
  for (var y = 0; y < rows; y++) {
    new_row = [];
    current_row = y * cols * 4;
    for (var x = current_row; x < current_row + cols * 4; x += 4) {
      new_row.push(data[x + 3]);
      new_row.push(data[x + 2]);
      new_row.push(data[x + 1]);
      new_row.push(data[x]);
    }
    new_row.reverse(); // reverse data set to switch rows

    for (var i = 0; i < new_row.length; i += 4) {
      data[current_row + i] = new_row[i];
      data[current_row + i + 1] = new_row[i + 1]; // reassign current data to data from opposite side
      data[current_row + i + 2] = new_row[i + 2];
      data[current_row + i + 3] = new_row[i + 3];
    }
  }
  postMessage(e.data);
};
