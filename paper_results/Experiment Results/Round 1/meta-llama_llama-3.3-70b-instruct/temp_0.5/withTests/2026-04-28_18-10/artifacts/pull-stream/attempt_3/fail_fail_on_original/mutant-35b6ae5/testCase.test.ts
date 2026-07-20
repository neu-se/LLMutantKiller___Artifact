import { prop } from '../util/prop.js';

describe('prop function', () => {
  it('should return undefined when key is a regular expression and no match is found', () => {
    const data = 'hello world';
    const key = /foo/;
    const result = prop(key)(data);
    expect(result).toBeUndefined();
  });
});