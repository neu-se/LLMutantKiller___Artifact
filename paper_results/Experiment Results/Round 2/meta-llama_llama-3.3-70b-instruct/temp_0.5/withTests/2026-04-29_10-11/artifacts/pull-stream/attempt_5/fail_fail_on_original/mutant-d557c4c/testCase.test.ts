import { pull } from '../../../../pull.js';

describe('pull', () => {
  it('should pass with a function as the second argument', () => {
    const read = () => {};
    const s = () => {};
    expect(() => pull(read, s)).not.toThrowError();
  });
});