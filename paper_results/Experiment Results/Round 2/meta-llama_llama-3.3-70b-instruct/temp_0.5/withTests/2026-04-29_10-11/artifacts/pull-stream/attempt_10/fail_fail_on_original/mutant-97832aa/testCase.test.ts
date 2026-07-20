import { pull } from '../pull.js';

describe('pull', () => {
  it('should not throw an error when a function and null are passed as arguments', () => {
    const read = () => {};
    const func = () => {};
    expect(() => pull(read, func, null)).not.toThrow();
  });

  it('should throw an error when a function and false are passed as arguments in the mutated code', () => {
    const read = () => {};
    const func = () => {};
    expect(() => pull(read, func, false)).toThrow();
  });
});