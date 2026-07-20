import { pull } from '../pull.js';

describe('pull', () => {
  it('should pass when a function and an object are passed as arguments', () => {
    const read = () => {};
    const obj = {};
    const func = () => {};
    expect(() => pull(read, func, obj)).not.toThrow();
  });

  it('should fail when a function and a non-object, non-function are passed as arguments', () => {
    const read = () => {};
    const nonObjNonFunc = 'string';
    expect(() => pull(read, nonObjNonFunc)).toThrow();
  });
});