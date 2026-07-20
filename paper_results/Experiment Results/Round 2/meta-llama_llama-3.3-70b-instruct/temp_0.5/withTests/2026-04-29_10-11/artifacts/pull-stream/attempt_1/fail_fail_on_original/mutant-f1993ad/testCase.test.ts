import { prop } from '../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the matched value when key is a RegExp', () => {
    const key = /a/;
    const data = 'abc';
    const result = prop(key)(data);
    expect(result).toBe('a');
  });

  it('should return the key when it is not a RegExp and not an object', () => {
    const key = 'key';
    const data = 'data';
    const result = prop(key)(data);
    expect(result).toBe('key');
  });
});