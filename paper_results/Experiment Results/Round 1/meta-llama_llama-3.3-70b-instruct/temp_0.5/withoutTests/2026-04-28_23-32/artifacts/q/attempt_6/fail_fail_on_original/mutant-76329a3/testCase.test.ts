describe('Q.fbind', () => {
  it('should bind a function to a promise', () => {
    const Q = require('./q.js');
    const promise = Q.resolve('test');
    const boundFunction = Q.fbind(promise, function(this: any, arg1: string, arg2: string) {
      return arg1 + arg2;
    });
    expect(typeof boundFunction).toBe('function');
    const result = boundFunction('hello, ', 'world!');
    expect(result.then).toBeInstanceOf(Function);
    result.then((value) => {
      expect(value).toBe('hello, world!');
    });
  });
});