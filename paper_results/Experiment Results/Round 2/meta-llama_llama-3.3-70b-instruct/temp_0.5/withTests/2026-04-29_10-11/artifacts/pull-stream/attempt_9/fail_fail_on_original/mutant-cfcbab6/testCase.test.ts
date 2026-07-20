import { pull } from '../pull.js';

describe('pull function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const values = [1, 2, 3, 4, 5];
    pull(
      pull.values(values),
      pull.collect((err: any, ary: any) => {
        if (err) throw err;
        expect(ary).toEqual(values);
      })
    );
  });
});