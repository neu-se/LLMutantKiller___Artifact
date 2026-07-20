const Q = require('./q.js');

describe('Q', () => {
  it('should dispatch "keys" operation correctly', () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj);
    const result = promise.keys();
    expect(result).not.toThrowError();
    result.then((value: string[]) => {
      expect(value).toEqual(Object.keys(obj));
    });
  });
});