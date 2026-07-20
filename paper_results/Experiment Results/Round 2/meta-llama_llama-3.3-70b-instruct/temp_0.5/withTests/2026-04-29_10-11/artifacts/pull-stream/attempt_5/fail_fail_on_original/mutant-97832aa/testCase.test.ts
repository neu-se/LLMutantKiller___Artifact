import { pull } from '../../../pull.js';

describe('pull', () => {
  it('should pass when a function and an object are passed as arguments', () => {
    const read = () => {};
    const obj = {};
    const func = () => {};
    expect(() => pull(read, func, obj)).not.toThrow();
  });

  it('should pass when a function and null are passed as arguments', () => {
    const read = () => {};
    const func = () => {};
    expect(() => pull(read, func, null)).not.toThrow();
  });

  it('should pass when a function and undefined are passed as arguments', () => {
    const read = () => {};
    const func = () => {};
    expect(() => pull(read, func, undefined)).not.toThrow();
  });
});