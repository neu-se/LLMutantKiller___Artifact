describe('prop function', () => {
  it('should return the correct value when key is a regular expression', () => {
    const prop = require('../util/prop.js');
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBe('hello');
    const data2 = 'foo bar';
    const result2 = prop(key)(data2);
    expect(result2).toBe(null);
  });
});