onmessage = function(e) {
  var data = e.data.image_data.data,
      cols = e.data.image_data.width,
      rows = e.data.image_data.height,
      new_rows = [], current_col;

  // take current row and move it to the opposite end of the array
  for (var y = 0; y < rows; y++) {
    new_rows.push([]);
    current_col = y * cols * 4;
    for (var x = current_col; x < current_col + cols * 4; x++) {
      new_rows[y].push(data[x]);
    }
  }

  new_rows.reverse();

  new_rows.forEach(function(row, y) {
    row.forEach(function(i, x) { // i is current image data value
      data[y * cols * 4 + x] = i;
    });
  });
  postMessage(e.data);
}
