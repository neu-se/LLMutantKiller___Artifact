import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const promise = Q(array);
    const result = promise.then((arr: number[]) => {
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    });
    expect(result).resolves.toBe(15);
  });
});