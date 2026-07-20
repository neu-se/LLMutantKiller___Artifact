import { Q } from "../../../../../q.js";

describe('Q.fbind', () => {
  it('should bind a function to a promise', () => {
    const promise = Q.resolve('test');
    const boundFunction = Q.fbind(promise, function(this: any, arg1: string, arg2: string) {
      return arg1 + arg2;
    });
    expect(typeof boundFunction).toBe('function');
    const result = boundFunction('hello, ', 'world!');
    expect(typeof result).toBe('object');
    expect(result.then).toBeInstanceOf(Function);
  });
});