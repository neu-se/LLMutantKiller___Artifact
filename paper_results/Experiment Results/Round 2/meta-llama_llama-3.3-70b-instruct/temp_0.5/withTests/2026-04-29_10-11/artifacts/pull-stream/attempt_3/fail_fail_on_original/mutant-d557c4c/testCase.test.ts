import { pull } from '../../pull.js';

describe('pull', () => {
  it('should pass when s is an object and a function', () => {
    const read = () => {};
    const s = { source: () => {} };
    expect(() => pull(read, s)).not.toThrowError();
  });

  it('should fail when s is an object but not a function', () => {
    const read = () => {};
    const s = {};
    expect(() => pull(read, s)).toThrowError();
  });
});