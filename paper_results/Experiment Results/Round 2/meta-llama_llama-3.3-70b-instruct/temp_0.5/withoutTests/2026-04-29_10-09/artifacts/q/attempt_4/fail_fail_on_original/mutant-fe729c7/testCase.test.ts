import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle array reduce correctly', () => {
    const array = [1, 2, 3, 4, 5];
    const result = Q.all([Q(array)]).then(([arr]: any[]) => {
      const reduced = arr.reduce((basis: number, current: number) => basis + current, 0);
      return reduced;
    });
    expect(result).resolves.toBe(15);
  });
});