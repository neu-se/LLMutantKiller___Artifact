import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should handle the case when the length of arguments is exceeded in the mutated code', () => {
    const read = () => {};
    const s1 = () => {};
    const s2 = () => {};
    const s3 = () => {};
    const s4 = () => {};

    const result = pull(read, s1, s2, s3, s4);
    expect(result).not.toThrowError();
  });
});