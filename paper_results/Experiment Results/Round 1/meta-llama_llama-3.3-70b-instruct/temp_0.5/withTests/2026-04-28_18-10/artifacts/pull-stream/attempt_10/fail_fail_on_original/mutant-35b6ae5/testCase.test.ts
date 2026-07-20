const prop = require('../util/prop.js');

describe('prop function', () => {
  it('should return undefined when key is a regular expression and no match is found', () => {
    const data = 'foo bar';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBeUndefined();
  });
});