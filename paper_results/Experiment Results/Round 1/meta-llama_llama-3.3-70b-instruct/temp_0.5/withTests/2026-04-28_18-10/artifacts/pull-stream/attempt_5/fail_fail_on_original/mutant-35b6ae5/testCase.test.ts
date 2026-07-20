import { prop } from '../util/prop.js';

describe('prop function', () => {
  it('should return null when key is a regular expression and no match is found', () => {
    const data = 'foo bar';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).toBeNull();
  });
});