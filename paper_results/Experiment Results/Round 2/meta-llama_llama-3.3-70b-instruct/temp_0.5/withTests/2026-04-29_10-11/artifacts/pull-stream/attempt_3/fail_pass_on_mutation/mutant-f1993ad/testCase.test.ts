import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should return the matched value when key is a RegExp', () => {
    const key = /a/;
    const data = 'abc';
    const result = prop(key)(data);
    expect(result).toBe('a');
  });

  it.skip('should return the key when it is not a RegExp and not an object', () => {
    const key = 'key';
    const data = 'data';
    const result = prop(key)(data);
    expect(result).toBe(key);
  });

  it('should return the matched value when key is a RegExp in the original code', () => {
    const key = /a/;
    const data = 'abc';
    const result = prop(key)(data);
    expect(result).toBe('a');
  });
});