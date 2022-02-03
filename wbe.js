var wbe = {};

  wbe.whitePercentage = function (pixels) {

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
    cP = cP.toFixed(2);

    return parseInt(cP);
  
  }
  
  
  wbe.blackPercentage = function (pixels) {
  
    var d = pixels.data;
    var c = 0;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
  
      if(r == 0 && g == 0 && b == 0) {
        c++;
       
      }
  
    }
  
    var cP = ((c*4)/d.length)*100;
    cP = cP.toFixed(2);

    return parseInt(cP);
    // return cP;
  }
  
  wbe.whiteBlackEmpty = function(pixels) {

  }


  export default wbe;