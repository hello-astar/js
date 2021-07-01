// 空间复杂度：主要看比较次数

// 冒泡排序 // 最好情况O(n)
Array.prototype.swap = function (i, j) {
	let temp = this[i]
	this[i] = this[j]
	this[j] = temp
}

function bubbleSort (arr) {
	for (let i = 0, n = arr.length; i < n; i++) {
		let flag = 0;
		for (let j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j+1]) {
				arr.swap(j, j + 1);
				flag = 1;
			}
		}
		if (!flag) break;
	}
	return arr;
}
// console.log(bubbleSort([10,-20, 2,32,1,0,45,-10]))
// 鸡尾酒排序（双向冒泡排序）=》 好处： 冒泡排序是单向的，若升序排序中小数靠后（或降序中小数靠前），每次bubble该数只能移动一位，效率很低，而双向冒泡排序左右摇摆，能规避这种糟糕的局面
function bidirectionalBubbleSort (arr) {
	let left = 0;
	let right = arr.length - 1;
	let flag = 1;
	while (left < right && flag) {
		flag = 0;
		for (let j = left; j < right; j++) {
			if (arr[j] > arr[j + 1]) {
				arr.swap(j, j + 1);
				flag = 1;
			}
		}
		right--;
		for (let k = right; k > left; k--) {
			if (arr[k] < arr[k - 1]) {
				arr.swap(k, k - 1);
				flag = 1;
			}
		}
		left++;
	}
	return arr;
}
// console.log(bidirectionalBubbleSort([-500,10,2,-600,32,1,0,45,-20, -100, -600]))

// 选择排序 // 最好也得O(n^2)
function selectSort (arr) {
	for (let i = 0, len = arr.length; i < len - 1; i++) {
		let min = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[min]) min = j;
		}
		if (min !== i) {
			arr.swap(i, min);
		}
	}
	return arr;
}
// console.log(selectSort([10,2,32,1,0,45,-20,100,200,-300]))

// 插入排序
function insertSort (arr) {
	for (let i = 0, len = arr.length; i < len - 1; i++) {
		let j = i;
		let current = arr[j + 1];
		while (j >= 0 && arr[j] > current) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = current;
	}
	return arr;
}
// console.log(insertSort([10,2,32,1,0,45,-20,100,200,-300, -600, 500, 150]))

// 折半插入排序 // 减少搜索次数，交换次数不变
function binaryInsertSort (arr) {
	for (let i = 0, len = arr.length; i < len - 1 ;i++) {
		let current = arr[i + 1];
		let left = 0;
		let right = i + 1;
		while (left <= right) {
			let mid = Math.floor(left + (right - left) / 2);
			if (arr[mid] > current) right = mid - 1;
			else left = mid + 1;
		}
		for (var j = i + 1; j > left; j--) arr[j] = arr[j - 1];
		arr[j] = current;
	}
	return arr;
}
// console.log(binaryInsertSort([10,2,32,1,0,45,-20,100,200,-300, -600, 500, 150]))

function shellSort (arr) {
	
}
function shellSort (arr) {
	for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
		for (let i = gap; i < arr.length; i++) {
			let j = i
			let current = arr[i]
			while (j >= gap && current < arr[j-gap]) {
				arr[j] = arr[j-gap]
				j = j - gap
			}
			arr[j] = current
		}
	}
	return arr
}
// console.log(shellSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500]))

// 希尔排序 // 缩小增量排序 // 分批插入排序
function shellSort (arr) {
  let len = arr.length
  for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap;i < len;i++) {
      var j = i
      var current = arr[i]
      while (j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[j] = current
    }
  }
  return arr
}
// console.log(shellSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500]))

// 归并排序
function merge (leftArr, rightArr) {
	let res = [];
	while (leftArr.length && rightArr.length) {
		if (leftArr[0] < rightArr[0]) {
			res.push(leftArr.shift());
		} else {
			res.push(rightArr.shift());
		}
	}
	return res.concat(leftArr).concat(rightArr);
}
function mergeSort (arr) {
	if (arr.length <= 1) return arr;
	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right)
}
console.log(mergeSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500]))
function partition (arr, left, right) {
	let key = arr[left];
	while (left < right) {
		while (left < right && arr[right] > key) right--;
		if (left < right) arr[left++] = arr[right];
		while (left < right && arr[left] < key) left++;
		if (left < right) arr[right--] = arr[left];
	}
	arr[left] = key;
	return left;
}

function quickSort (arr, left, right) {
	if (left < right) {
		let mid = partition(arr, left, right);
		quickSort(arr, left, mid - 1);
		quickSort(arr, mid + 1, right);
	}
}

function maxHeapify (arr, i, size) {
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;
	if (left < size && arr[left] > arr[largest]) largest = left;
	if (right < size && arr[right] > arr[largest]) largest = right;
	if (largest !== i) {
		arr.swap(largest, i);
		maxHeapify(arr, largest, size);
	}
}
// 堆排序
function heapSort (arr) {
	for (let len = arr.length, i = Math.floor(len / 2); i >= 0; i--) {
		maxHeapify(arr, i, len);
	}
	for (let len = arr.length, j = len - 1; j > 0; j--) {
		arr.swap(j, 0);
		maxHeapify(arr, 0, j);
	}
	return arr;
}
console.log(heapSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500]))

function countSort (arr) {
	let len = arr.length;
	if(len <= 1) return arr;
	let min = Math.min.apply(null, arr);
	let max = Math.max.apply(null, arr);
	if (min === max) return arr;
	let count = {};
	let res = [];
	for (let i = 0; i < len; i++) {
		count[arr[i]] = count.hasOwnProperty(arr[i]) ? count[arr[i]] + 1 : 1;
	}
	for (let i = min; i < max; i++) {
		if (count[i]) {
			res = res.concat(new Array(count[i]).fill(i));
		}
	}
	return res;
}
// console.log(countSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500]))

function bucketSort (arr, bucketSize) {
	
}
// 桶排序
function bucketSort (arr, bucketSize) {
	let n = arr.length
	if (n <= 1) return arr
	let min = Math.min.apply(null, arr)
	let max = Math.max.apply(null, arr)
	let range = (max - min + 1) / bucketSize
	let buckets = new Array(bucketSize)
	for (let i = 0; i < n; i++) {
		let currentBucketIndex = Math.floor((arr[i] - min) / range)
		buckets[currentBucketIndex] = buckets[currentBucketIndex] || []
		let j = buckets[currentBucketIndex].length - 1
		while (j >= 0 && buckets[currentBucketIndex][j] > arr[i] ) {
			buckets[currentBucketIndex][j+1] = buckets[currentBucketIndex][j]
			j--
		}
		buckets[currentBucketIndex][j+1] = arr[i]
	}
	return buckets.reduce((res, item) => {
		return res.concat(item || [])
	}, [])
} 
// console.log(bucketSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500], 4))
// 基数排序 // 整数排序
// LSD基数排序
function LSDSort (arr) {
	let n = arr.length
	if (n <= 1) return arr
	let bucket = new Array(10) // 0 - 9
	let max = Math.max.apply(null, arr)
	let count = max.toString().length
	let result = arr
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < n; j++) {
			var curr = Math.floor(result[j]/(Math.pow(10,i))) % 10
			bucket[curr] = bucket[curr] || []
			bucket[curr].push(result[j])
		}
		result = []
		for(var j = 0; j < 10; j++) {
			if(bucket[j]) {
				result = result.concat(bucket[j])
			}
		}
		// 重置桶
		bucket = new Array(10)
	}
	return result
}
// console.log(LSDSort([-400, -10, 10, 32, 1, -600, 0, 45, -20, 100, 200, -300, -500]))
// MSD基数排序
function minheapify (arr, i, size) {
	let l = 2 * i + 1
	let r = 2 * i + 2
	let min = i
	if (l < size && arr[l] < arr[min]) min = l
	if (r < size && arr[r] < arr[min]) min = r
	if (min !== i) {
		let temp = arr[i]
		arr[i] = arr[min]
		arr[min] = temp
		minheapify(arr, min, size)
	}
}
function topK (arr, k) {
	let heap = new Array(k)
	for (let i = 0; i < k; i++) {
		heap[i] = arr[i]
	}
	for (let i = Math.floor(k / 2); i >= 0 ; i--) {
		minheapify(heap, i, k)
	}
	for (let i = k; i < arr.length; i++) {
		if (arr[i] <= heap[0]) continue
		heap[0] = arr[i]
		minheapify(heap, 0, k)
	}
	return heap
}
console.log(topK([1,2,3,4,5,6,6.4,8,9,6.5,6.45], 7))
function partition (arr, left, right) {
}
function partition (arr, left, right) {
  let t = arr[left]
  let low = left
  let high = right
  while (low < high) {
		while (low < high && arr[high] < t) high--
    if (low < high) arr[low++] = arr[high]
    while (low < high && arr[low] >= t) low++
    if (low < high) arr[high--] = arr[low]
  }
  arr[low] = t
  return low
}
function topK (arr, k) {
	let left = 0
	let right = arr.length - 1
	while (1) {
		let mid = partition(arr, left, right)
		if (mid === k) break
		if (mid > k) {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return arr.slice(0, k)
}
// console.log(topK([10,1, 2, 3, 7, 4, 5, 6, 6.4, 8, 9, 6.5, 6.45], 7))
