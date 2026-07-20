describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const sparseArray = new Array(10);
    sparseArray[0] = 1;
    sparseArray[1] = 2;
    sparseArray[2] = 3;
    sparseArray[3] = 4;
    sparseArray[4] = 5;
    const promise = Promise.resolve(sparseArray);
    const result = promise.then((arr: number[]) => {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
          sum += arr[i];
        }
      }
      return sum;
    });
    expect(result).resolves.toBe(15);
  });
});