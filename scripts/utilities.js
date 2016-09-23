function forEach(myArray, myCallback){
    for (var i = 0; i < myArray.length; i++){
        myCallback(myArray[i]);
    }
}