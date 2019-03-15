// Used to find the union of two arrays
function unionArrays(x, y) {
  let result = [...new Set([...x, ...y])];
  return result;
}

/* 
  Finds the values of the specified property of objects
  in an array of objects. Returns an array of values.
*/
function arrayObjProperty(inputArray, property) {
  let results = []
  
  for(i = 0; i < inputArray.length; i++) {
    results.push(inputArray[i][property])
  };

  return results
};

module.exports = {
  unionArrays,
  arrayObjProperty,
};