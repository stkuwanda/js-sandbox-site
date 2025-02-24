// comparison function to get 
// ascending order.
// a shortened version using the idea
// of only return postive, negative or zero
// result.
function compareNumeric(a, b) {
	return a - b;
}

const arr = [1, 2, 15];

// array is sorted in place
// and a ref to this array is returned
arr.sort(compareNumeric);
console.log(arr);
