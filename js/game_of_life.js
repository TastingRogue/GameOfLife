

var pixelSize = 6;
var size = 87;
var canvas = document.getElementById('world');
canvas.width = pixelSize*size;
canvas.height = pixelSize*size;
var context = canvas.getContext('2d');
var board = blank_state();

function blank_state(){
   var board = [];
   for (var i=0;i<size;i++){
      var row = [];
      for (var j=0;j<size;j++){
         row.push(0);
      }
      board.push(row);
   }
   return board;
}

function manual_population(board) {
   board[17][8] = 1;
   board[17][9] = 1;
   board[18][8] = 1;
   board[18][9] = 1;

   board[27][8] = 1;
   board[27][9] = 1;
   board[27][10] = 1;
   board[28][7] = 1;
   board[28][11] = 1;
   board[29][6] = 1;
   board[29][12] = 1;
   board[30][6] = 1;
   board[30][12] = 1;
   board[31][9] = 1;
   board[32][7] = 1;
   board[32][11] = 1;
   board[33][8] = 1;
   board[33][9] = 1;
   board[33][10] = 1;
   board[34][9] = 1;

   board[37][6] = 1;
   board[37][7] = 1;
   board[37][8] = 1;
   board[38][6] = 1;
   board[38][7] = 1;
   board[38][8] = 1;
   board[39][5] = 1;
   board[39][9] = 1;
   board[41][4] = 1;
   board[41][5] = 1;
   board[41][9] = 1;
   board[41][10] = 1;

   board[51][6] = 1;
   board[51][7] = 1;
   board[52][6] = 1;
   board[52][7] = 1;
}

function displayBoard(board) {
   for (var x = 0; x < board.length; x++) {
      for (var y = 0; y < board[x].length; y++) {
         drawInCanvas(x,y,board[x][y]);
      }
   }
}

function drawInCanvas(x,y,cell) {
   context.beginPath();
   context.rect(x*pixelSize,y*pixelSize,pixelSize,pixelSize);
   context.fillStyle = cell ? 'black' : '#EEE';
   context.fill();
}

function aliveNeighbors(board, x,y){

   var totalAlive = 0;
   //ArribaDer
   if(x==board.length-1 && y==board.length-1) {
      totalAlive = 
         board[x-1][y]+
         board[x-1][y-1]+
         board[x][y-1];
   }
   else//ArribaIzq 
      if(x==0 && y==board.length-1){
         totalAlive = 
            board[x+1][y]+
            board[x+1][y-1]+
            board[x][y-1];
            /*board[board.length-1][board.length-1]+
            board[board.length-1][board.length-2]+
            board[board.length-1][board.length-3]+
            board[board.length-2][board.length-1]+
            board[board.length-3][board.length-1]*/
      }
      else//AbajoIzq
         if(x==0 && y==0){
            totalAlive =
               board[x][y+1]+
               board[x+1][y+1]+
               board[x+1][y];
         }
         else//AbajoDer
            if(x==board.length-1 && y==0){
               totalAlive =
                  board[x][y+1]+
                  board[x-1][y-1]+
                  board[x-1][y];
                  /*board[0][0]+
                  board[0][1]+
                  board[0][2]+
                  board[1][0]+
                  board[2][0]*/
            }
            else//Ariba
               if(y==0){
                  totalAlive = 
                     board[x-1][y]+
                     board[x-1][y+1]+
                     board[x][y+1]+
                     board[x+1][y+1]+
                     board[x+1][y]+
                     board[x-1][board.length-1]+
                     board[x][board.length-1]+
                     board[x+1][board.length-1];
               }
               else//Abajo
                  if(y==board.length-1){
                     totalAlive = 
                        board[x-1][y]+
                        board[x-1][y-1]+
                        board[x][y-1]+
                        board[x+1][y-1]+
                        board[x+1][y]+
                        board[x-1][0]+
                        board[x][0]+
                        board[x+1][0];
                  }
                  else//Der
                     if(x==board.length-1){
                        totalAlive =
                           board[x][y-1]+
                           board[x-1][y-1]+
                           board[x-1][y]+
                           board[x-1][y+1]+
                           board[x][y+1]+
                           board[0][y+1]+
                           board[0][y]+
                           board[0][y-1];
                     }
                     else//Izq
                        if(x==0){
                           totalAlive = 
                              board[x][y-1]+
                              board[x+1][y-1]+
                              board[x+1][y]+
                              board[x+1][y+1]+
                              board[x][y+1]+
                              board[board.length-1][y+1]+
                              board[board.length-1][y]+
                              board[board.length-1][y-1];
                        }
                        else{
                           totalAlive =
                              board[x-1][y-1]+
                              board[x-1][y]+
                              board[x-1][y+1]+
                              board[x][y-1]+
                              board[x][y+1]+
                              board[x+1][y-1]+
                              board[x+1][y]+
                              board[x+1][y+1];
                        }
   return totalAlive;
}

function iteration(board) {
   var newState = blank_state();
   for (var x = 0; x < board.length; x++) {
      for (var y = 0; y < board[x].length; y++) {
         var cell = board[x][y];
         var neighbors = aliveNeighbors(board,x,y);

         if (cell == 1) {
            if (neighbors < 2) {
               newState[x][y] = 0;
            }else
               if (neighbors > 3) {
                  newState[x][y] = 0;
               }else
                  if (neighbors == 2 || neighbors == 3) {
                     newState[x][y] = 1;
                  }
         }else
            if (cell == 0 && neighbors == 3) {
               newState[x][y] = 1;
            }
      }
   }
   return newState;
}

manual_population(board);
displayBoard(board);

setInterval(function(){
   var newState = iteration(board);
   displayBoard(newState);
   board = newState;
},50);
