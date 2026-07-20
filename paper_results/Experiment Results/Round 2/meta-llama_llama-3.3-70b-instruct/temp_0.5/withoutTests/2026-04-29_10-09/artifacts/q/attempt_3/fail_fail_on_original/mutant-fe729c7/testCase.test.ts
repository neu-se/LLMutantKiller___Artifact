import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const result = Q(array).then((arr) => arr.reduce((basis: number, current: number) => basis + current, 0));
    expect(result).resolves.toBe(15);
  });
});