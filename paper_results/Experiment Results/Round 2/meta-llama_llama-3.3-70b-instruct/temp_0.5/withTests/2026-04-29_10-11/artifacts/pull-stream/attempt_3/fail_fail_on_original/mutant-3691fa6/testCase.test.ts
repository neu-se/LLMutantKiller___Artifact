import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return the matched string when key is a RegExp object and object is a string', () => {
    const obj = 'hello world';
    const key = /world/;
    const result = prop(key)(obj);
    expect(result).toBe('world');
  });

  it('should return the key itself when key is not a string or RegExp', () => {
    const obj = {};
    const key = {};
    const result = prop(key)(obj);
    expect(result).toBe(key);
  });

  it('should throw an error when key is a RegExp object and object is not a string in the mutated code', () => {
    const obj = {};
    const key = /world/;
    expect(() => prop(key)(obj)).toThrowError();
  });
});