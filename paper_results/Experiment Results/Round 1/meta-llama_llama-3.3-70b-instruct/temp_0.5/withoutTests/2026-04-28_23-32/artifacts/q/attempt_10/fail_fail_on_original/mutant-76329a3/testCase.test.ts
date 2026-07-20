import { Q } from '../../../q';

describe('Q.fbind', () => {
  it('should bind a function to a promise', () => {
    const promise = Q.resolve('test');
    const boundFunction = Q.fbind(promise, (arg1: string, arg2: string) => arg1 + arg2);
    expect(typeof boundFunction).toBe('function');
    expect(() => boundFunction('hello, ', 'world!')).not.toThrow();
    const result = boundFunction('hello, ', 'world!');
    expect(result).not.toBeUndefined();
    expect(typeof result.then).toBe('function');
    result.then((value: string) => {
      expect(value).toBe('hello, world!');
    });
  });
});