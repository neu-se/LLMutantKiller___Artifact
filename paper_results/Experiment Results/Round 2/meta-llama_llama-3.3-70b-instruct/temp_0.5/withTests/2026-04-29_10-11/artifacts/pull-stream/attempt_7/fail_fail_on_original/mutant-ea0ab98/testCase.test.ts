import { prop } from '../../../util/prop.js';

describe('prop function', () => {
  it('should return a function that extracts a property from an object using a regexp', () => {
    const data = 'Hello World';
    const getMatch = prop(/World/);
    expect(typeof getMatch).toBe('function');
    const result = getMatch(data);
    expect(result).not.toBeNull();
  });
});