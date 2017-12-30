const Score = function(){
  this._value = 0;
}

Score.prototype ={
  increaseBy : function(value){
    this._value += value;
  },
  get value(){
    return this._value;
  }
}
