var workers = {
  inverter: new Worker("javascripts/inverter.js"), // store web workers as properties
  horiz_flipper: new Worker("javascripts/horiz_flipper.js"),
  vert_flipper: new Worker("javascripts/vert_flipper.js"),
  brightness: new Worker("javascripts/brightness.js"),
  saturation: new Worker("javascripts/saturation.js")
};

$(window).on("load", function() {
  var canvas = $("canvas").get(0),
      img = $("img").remove().get(0),
      ctx = canvas.getContext("2d");

  canvas.width = img.width; // set canvas dimensions to image dimensions
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0); // draw image to the canvas

  // attach message event listener to each worker
  for (var worker in workers) {
    workers[worker].addEventListener("message", function(e) {
      putData(ctx, e.data.image_data);
    });
  }

  // attach click event to anchors so that corresponding worker will run when user clicks on it
  $("#tools").on("click", "a", function(e) {
    e.preventDefault();
    var data = { image_data: getData(ctx) },
        worker = workers[$(e.target).attr("data-method")];

    worker.postMessage(data);
  });

  function getData(ctx) { // image data from canvas context
    return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function putData(ctx, image_data) {
    ctx.putImageData(image_data, 0, 0);
  }
});
