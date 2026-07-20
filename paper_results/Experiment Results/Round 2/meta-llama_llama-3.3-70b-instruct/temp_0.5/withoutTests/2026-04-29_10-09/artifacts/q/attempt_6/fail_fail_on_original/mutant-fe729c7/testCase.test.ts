import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const promise = Q(array);
    const result = promise.then((arr: number[]) => {
      if (arr.length !== 5) {
        throw new Error('Array length is not 5');
      }
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