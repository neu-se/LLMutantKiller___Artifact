import { pull } from '../../../../../pull.js';

describe('pull', () => {
  it('should throw an error when s is an object but not a function', () => {
    const read = () => {};
    const s = { foo: 'bar' };
    expect(() => pull(read, s)).toThrowError();
  });
});