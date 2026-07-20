const prop = require('../../../../util/prop');

describe('prop function', () => {
  it('should return a function that extracts a property from an object using a regexp', () => {
    const data = 'Hello World';
    const getMatch = prop(/World/);
    const result = getMatch(data);
    expect(result).toBe('World');
  });
});