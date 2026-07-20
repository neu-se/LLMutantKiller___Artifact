import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const callback = (basis: number, current: number) => basis + current;
    const initialValue = 0;
    const result = array_reduce(array, callback, initialValue);
    expect(result).toBe(15);
  });
});