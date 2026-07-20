import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.fbind', () => {
  it('should bind a function to a promise', () => {
    const promise = Q.resolve('test');
    const boundFunction = Q.fbind(promise, function(arg1, arg2) {
      return arg1 + arg2;
    });
    const result = boundFunction('hello, ', 'world!');
    expect(Q.isPromise(result)).toBe(true);
    result.then((value) => {
      expect(value).toBe('hello, world!');
    });
  });
});