import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should return a function that extracts a property from an object using a regexp', () => {
    const data = 'Hello World';
    const getMatch = prop(/World/);
    expect(getMatch(data)).toBe('World');
  });
});