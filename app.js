// comparison function to get 
// ascending order.
function compareNumeric(a, b) {
	if (a > b) return 1;
	if (a == b) return 0;
	if (a < b) return -1;
}

const arr = [1, 2, 15];

// array is sorted in place
// and a ref to this array is returned
arr.sort(compareNumeric);
console.log(arr);
