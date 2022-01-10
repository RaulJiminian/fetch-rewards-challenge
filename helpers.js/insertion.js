function sumDate(arr) {
  return arr[0] * 100 + arr[1] * 10 + arr[2] / 10;
}

export const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let finalSwapValue = arr[i];
    let curVal = sumDate(arr[i].timestamp.split("-"));

    let j = i - 1;
    let loopVal = sumDate(arr[j].timestamp.split("-"));

    while (j >= 0 && loopVal > curVal) {
      arr[j + 1] = arr[j];

      j--;

      if (j >= 0) {
        loopVal = sumDate(arr[j].timestamp.split("-"));
      }
    }

    arr[j + 1] = finalSwapValue;
  }

  return arr;
};
