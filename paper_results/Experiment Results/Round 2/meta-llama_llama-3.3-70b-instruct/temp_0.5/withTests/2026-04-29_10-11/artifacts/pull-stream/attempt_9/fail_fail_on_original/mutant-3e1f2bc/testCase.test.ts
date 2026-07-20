import { pull } from '../pull';

describe('pull function', () => {
  it('should throw an error when a non-function is passed as the first argument and a non-object is passed as the second argument in the mutated code', () => {
    const func = () => {};
    const obj = {};
    expect(() => pull(func, true)).toThrowError();
  });
});