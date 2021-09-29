//These are a set of custom filters written for chess pice recognition purpose  
//- Though the names are generic - code inside filters has been modified to fit specific need

var Filters = {};

Filters.getPixels = function(img) {
  var c = this.getCanvas(img.width, img.height);
  var ctx = c.getContext('2d');
  ctx.drawImage(img,0,0);
  return ctx.getImageData(0,0,c.width,c.height);
};

Filters.getCanvas = function(w,h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};


Filters.filterImage = function(filter, image, var_args) {
  // console.log(image);
  var args = [this.getPixels(image)];
  for (var i=2; i<arguments.length; i++) {
    args.push(arguments[i]);
  }
  return this.imageDataToImage(filter.apply(null, args));
};

Filters.imageDataToImage = function (idata) {

  var c = document.createElement("CANVAS");

  c.width = idata.width;
  c.height = idata.height;
  var ctx = c.getContext('2d');
  ctx.putImageData(idata, 0, 0);
  return c.toDataURL();

}

Filters.threshold = function(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var a = d[i+3];
    // console.log(a);
    var v = 0;
    // if(a > 240) { //This is custom condition introduced to remove noise 
     v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;  
    // }
    
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};


Filters.inRange = function(pixels, low, high) {
  var tep = 100;
  console.log(tep.between(low[1], high[1]));
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var a = d[i+3];
    var v = 255;

    if(r.between(low[0], high[0]) && g.between(low[1], high[1]) && b.between(low[2], high[2]) && a == 255) {
      v = 0;
    } 
    d[i] = d[i+1] = d[i+2] = v

  }
  
  return pixels;
};


Filters.grayscale = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];

    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

Filters.brightness = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
};


Filters.contrast = function(pixels, contrast) {
  var d = pixels.data;
    contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
    var intercept = 128 * (1 - contrast);
    for(var i=0;i<d.length;i+=4){   //r,g,b,a
        d[i] = d[i]*contrast + intercept;
        d[i+1] = d[i+1]*contrast + intercept;
        d[i+2] = d[i+2]*contrast + intercept;
   
   }
   return pixels;
}


Filters.whitePercentage = function (pixels) {

  var d = pixels.data;
  var c = 0;


  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];

    if(r == 255 && g == 255 && b == 255) {
      c++;

    }

  }

    var cP = ((c*4)/d.length)*100;
  return cP;

}


Filters.blackPercentage = function (pixels) {

  var d = pixels.data;
  var c = 0;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];

    if(r < 10 && g < 10 && b < 10) {
      c++;
     
    }

  }

  var cP = ((c*4)/d.length)*100;

  return cP;
}

Filters.edgeDetection = function(image) {

  var grayscalePixelData = Filters.getPixels(image);
  var grayscale = Filters.grayscale(grayscalePixelData);
// Note that ImageData values are clamped between 0 and 255, so we need
// to use a Float32Array for the gradient values because they
// range between -255 and 255.
var vertical = Filters.convolute(grayscale,
  [ -1, 0, 1,
  -2, 0, 2,
  -1, 0, 1 ]);
var horizontal = Filters.convolute(grayscale,
  [ -1, -2, -1,
  0,  0,  0,
  1,  2,  1 ]);
var final_image = Filters.createImageData(vertical.width, vertical.height);
for (var i=0; i<final_image.data.length; i+=4) {
  // make the vertical gradient red
  var v = Math.abs(vertical.data[i]);
  final_image.data[i] = v;
  // make the horizontal gradient green
  var h = Math.abs(horizontal.data[i]);
  final_image.data[i+1] = h;
  // and mix in some blue for aesthetics
  final_image.data[i+2] = (v+h)/4;
  final_image.data[i+3] = 255; // opaque alpha
}
var final_image = this.inRange(final_image, [-1,-1,-1], [50,50,50]);
return this.imageDataToImage(final_image);
}




Filters.sharpen = function(image) {
 
  var pixelData = Filters.getPixels(image);
  // var grayscale = Filters.grayscale(grayscalePixelData);
// Note that ImageData values are clamped between 0 and 255, so we need
// to use a Float32Array for the gradient values because they
// range between -255 and 255.


var final_image = this.inRange(final_image, [-1,-1,-1], [50,50,50]);
return this.imageDataToImage(final_image);
}


Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
  return this.tmpCtx.createImageData(w,h);
};



Filters.convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;

  var output = Filters.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};


Number.prototype.between  = function (a, b) {
  var min = Math.min.apply(Math, [a,b]),
  max = Math.max.apply(Math, [a,b]);
  return this > min && this < max;
};

export default Filters;