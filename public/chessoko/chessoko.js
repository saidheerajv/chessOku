import { runFilter, threshold, edgeDetection, inRange, sharpen, grayscale, brightness, contrast } from './imageMethods.js';


/* For testing
 $("#go-one").on("click", goOne);

 function goOne() {
   getSquare($("#f1").val(), $("#f2").val()).then(function (result) {    
     console.log(result);            
   });
 }

*/

 var processedImg = document.createElement("IMG");
 processedImg.id = "binaryImg";

 var pieceImg = document.createElement("IMG");
 pieceImg.id = "pieceImg";

 var fen =  Array.from(Array(8), () => new Array(8));
 var iteration = 0;



 export function getFen(subjectImage = "c-image", callbackFunction) {

   var img = document.getElementById(subjectImage); 

   var contrastedImg = document.createElement("IMG");
   contrastedImg.src = contrast(img);  

   contrastedImg.onload = function () {
     processedImg.src = threshold(contrastedImg); 
   }


   pieceImg.src = edgeDetection(img);

   processedImg.onload = function () {
     console.log("processedImg", processedImg.width);
   }

   pieceImg.onload = function () {
     console.log("pieceImg", pieceImg.width);

     hit(subjectImage, callbackFunction);
   }

 } 

 const pieceClassifier = ml5.imageClassifier('chessoko/piece-model/model.json', () => {
   console.log("Loaded piece model");
 });
 const ldeClassifier = ml5.imageClassifier('chessoko/lde-model/model.json', () => {
   console.log("Loaded LDE model");
 });



         function hit(ImageElementId = "c-image", callback) { // loop should be written here

           var isImageProcessed = true;

           if(isImageProcessed) {
             iteration = 0;

             for(var i = 0; i < 8; i++) {
               for(var j = 0; j < 8; j++) {
                 getSquare(i,j).then(function (result) {
                  // console.log(result);
                  fen[result[0]][result[1]] = result[2];
                  iteration++;
                  if(iteration >63) {
                    console.log(fen);
                    processFen(fen, callback);

                  }
                  // console.count();
                });

               }

             }  
           } else { 
             console.log("Precedece issue");
           }


         }


         async function getSquare(i,j) {

           let cx = (processedImg.width/8);
           let cy = (processedImg.height/8);
           var piece = "0";




           var currentSquare = document.createElement("IMG"); 
           currentSquare.src = getClippedRegion(processedImg, i*cx, j*cy, cx, cy);
           var currentPiece = document.createElement("IMG");
           currentPiece.src = getClippedRegion(pieceImg, i*cx, j*cy, cx, cy);


           let myPromise = new Promise(function(myResolve, myReject) { 

             currentSquare.onload = function () {
               var guess1 = ldeClassifier.classify(currentSquare, (err, results) => {
                  // ld = results[0].label;
                  console.log(i,j,results[0]);
                  if(results[0].label != "empty") {
                    pieceClassifier.classify(currentPiece, (err, result) => {

                      piece = result[0].label;

                      if(results[0].label == "dark") {
                        piece = piece.toLowerCase();  
                      }
                      document.getElementById("wrapper").appendChild(currentSquare);   
                      myResolve([j, i, piece]);
                    });                  
                  } else {
                  // fen[i][j] = "0";

                  myResolve([j,i,"0"]);
                } 

              });
             }

           });

           var col = await myPromise;

           return col;

         }




         function getClippedRegion(image, x, y, width, height) {

           var canvas = document.createElement('canvas'),
           ctx = canvas.getContext('2d');

           canvas.width = width;
           canvas.height = height;
           ctx.drawImage(image, x, y, width, height,  0, 0, width, height);

           var imageOfClippedPart = canvas.toDataURL("image/png");
           return imageOfClippedPart;
         }




// // Make a prediction with a selected image
// async function predictPiece(img1) {
//  var tempImg1 = document.createElement("IMG");
//  tempImg1.src = img1;
//   var piece = "0";
//   var guess1 = await classifier.classify(tempImg1, (err, results) => {
//       piece = results[0].label;
//       // console.log(piece);
//   });

//   return piece;

// }



function processFen(fenArray, callback) {
  var fenStr = "";

  fenArray.forEach((item) => {

    item = item.join("");

    fenStr = fenStr + "/" + item;

  });

  var patt1 = /\d{1,}/g; 
  var result = fenStr.match(patt1);
  result.forEach((item) => {
    fenStr = fenStr.replace(item.toString(), item.toString().length); 
  });

  console.log("https://lichess.org/editor" + fenStr + "_w_KQkq_-_0_1");
  callback(fenStr);
}


function modelLoaded() {
  console.log('Model Loaded!');
}

function callbackFunction(fenString) {
  document.getElementById("fen").innerHTML = fenString;
}