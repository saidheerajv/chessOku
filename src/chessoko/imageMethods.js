
  import Filters from "./filters.js";

  export  function runFilter(id, filter, arg1, arg2, arg3) {
    var c = document.getElementById("myCanvas");
    var img = document.getElementById("c-image");       



    c.width = idata.width;
    c.height = idata.height;
    var ctx = c.getContext('2d');
    ctx.putImageData(idata, 0, 0);
    c.style.display = 'block';
    return c.toImageData();
    
  }

  
  export function threshold(img) {
        var idata = Filters.filterImage(Filters.threshold, img, 127);
        return idata;
  }

  export function inRange(img) {    
    var idata = Filters.filterImage(Filters.inRange, img, [0,0,0], [90,90,90]);
    return idata; 
  }

  export function sharpen(img) {
    var idata = Filters.filterImage(Filters.convolute, img,
   [ 1/9, 1/9, 1/9,
    1/9, 1/9, 1/9,
    1/9, 1/9, 1/9 ]
);
    return idata;
  }

  export function edgeDetection(img) {
    // runFilter('edgeDetection', Filters.edgeDetection);
         var idata = Filters.edgeDetection(img);
        // console.log(idata);
        return idata;
  }

  export function grayscale(img) {
    // runFilter('grayscale', Filters.grayscale);
            var idata = Filters.filterImage(Filters.grayscale, img);
        return idata;
  }

  export function brightness(img) {
    // runFilter('grayscale', Filters.grayscale);
            var idata = Filters.filterImage(Filters.brightness, img, 10);
        return idata;
  }

  export function contrast(img) {
    // runFilter('grayscale', Filters.grayscale);
            var idata = Filters.filterImage(Filters.contrast, img, 60);
        return idata;
  }

  export function whiteP(img) {
    var pixelData = Filters.getPixels(img);
    return Filters.whitePercentage(pixelData);

  }

  export function blackP(img) {
        var pixelData = Filters.getPixels(img);
    return Filters.blackPercentage(pixelData);
  }
