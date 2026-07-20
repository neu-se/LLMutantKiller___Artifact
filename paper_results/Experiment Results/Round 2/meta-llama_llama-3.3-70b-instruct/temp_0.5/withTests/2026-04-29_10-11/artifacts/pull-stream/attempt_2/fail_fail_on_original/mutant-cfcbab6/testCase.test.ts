import { pull } from '../../pull.js';

describe('pull function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const values = [1, 2, 3, 4, 5];
    const read = pull(
      pull.values(values),
      pull.through((data) => data),
      pull.collect((err, ary) => {
        if (err) throw err;
        expect(ary).toEqual(values);
      })
    );
    expect(read).toBeInstanceOf(Function);
  });
});