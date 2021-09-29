<template>

  <nav class="navbar navbar-dark">
  <div class="container-fluid">
    <h1 class="ml-3 h1">ChessOko</h1>
  </div>
</nav>

<div class="mt-0" style="background-color : #d6dbd7">
 <div class="container">
  <div class="row my-4">
    <div class="col-8 px-2">
      <div id="myBoard" class="w-75 mx-auto"></div>
    </div>
    
    
    <div class="col-4 px-2">
    
   <div class="card my-2 w-75">
  <div class="card-header">
    To Move
  </div>
  <div id="status"></div>
</div>


  <div class="card my-2 w-75">
  <div class="card-body">
    <h5 class="card-title">FEN </h5>
        <div id="fen"></div>
      <a href="#" class="btn btn-success">Copy</a>    
  </div>
</div>


  <div class="card my-2 w-75">
  <div class="card-body">
    <h5 class="card-title">Continue on : </h5>
    <a href="#" class="btn btn-primary">Chess.com</a>
    <a href="#" class="btn btn-primary">lichess.org</a>
  </div>
</div>

  <div class="card my-2 w-75">
  <div class="card-body">
    <h5 class="card-title">Upload Image to scan</h5>
    <a href="#" class="btn btn-primary">Upload</a>
  </div>
</div>

  </div>
  </div>
</div>
</div>



<!-- Crooping Modal - For cycle 2 -->
   <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> -->

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <demoCrop/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  
  
</template>

<script>
import demoCrop from './components/demoCrop.vue';

export default {
  name: 'App',
  mounted() {
    let chessJSScript = document.createElement('script');
    chessJSScript.setAttribute('src', 'chess.js');
    document.head.appendChild(chessJSScript);


    let chessBoardScript = document.createElement('script');
    chessBoardScript.setAttribute('src', 'chessboard/js/chessboard-1.0.0.min.js');
    document.head.appendChild(chessBoardScript);

        let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'game.js')
    document.head.appendChild(recaptchaScript);

            let recaptchaScript1 = document.createElement('script')
    recaptchaScript1.setAttribute('src', 'chessoko/chessoko.js')
    recaptchaScript1.setAttribute('type', 'module')
    document.head.appendChild(recaptchaScript1);


  },
  components: {
    demoCrop,
   
  }
}
</script>

<style>
.navbar {
  background-color: #009999;
}

h1 {
  font-size : 40px;
  color : #f5f5f5;
}

</style>
