describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const promise = Promise.resolve(array);
    const result = promise.then((arr: number[]) => {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (i in arr && arr[i] !== undefined) {
          sum += arr[i];
        } else {
          throw new Error('Array element is undefined');
        }
      }
      return sum;
    });
    expect(result).resolves.toBe(15);
  });
});