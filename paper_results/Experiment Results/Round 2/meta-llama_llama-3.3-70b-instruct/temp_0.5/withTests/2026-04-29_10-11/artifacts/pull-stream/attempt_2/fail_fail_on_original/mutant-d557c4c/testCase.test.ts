import { pull } from '../pull.js';

describe('pull', () => {
  it('should pass when s is an object and a function', () => {
    const read = () => {};
    const s = { source: () => {} };
    expect(() => pull(read, s)).not.toThrowError();
  });

  it('should pass when s is not an object', () => {
    const read = () => {};
    const s = 'string';
    expect(() => pull(read, s)).not.toThrowError();
  });
});