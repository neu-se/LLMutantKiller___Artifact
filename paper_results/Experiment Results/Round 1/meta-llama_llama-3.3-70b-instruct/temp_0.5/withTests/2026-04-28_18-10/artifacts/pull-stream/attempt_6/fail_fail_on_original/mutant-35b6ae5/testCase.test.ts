describe('prop function', () => {
  it('should return null when key is a regular expression and no match is found', () => {
    const prop = require('../../../../util/prop.js');
    const data = 'foo bar';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBeNull();
  });
});