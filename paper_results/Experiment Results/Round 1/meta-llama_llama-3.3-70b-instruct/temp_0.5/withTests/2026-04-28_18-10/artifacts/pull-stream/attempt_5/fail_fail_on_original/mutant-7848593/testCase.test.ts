import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should correctly handle the case where key is a regexp', () => {
    const obj = { foo: 'bar' };
    const key = /foo/;
    const extractProp = prop(key);
    expect(extractProp(obj)).toBe('bar');
  });

  it('should return undefined when key is an object and not a regexp', () => {
    const obj = { foo: 'bar' };
    const key = { exec: () => null };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBeUndefined();
  });

  it('should return key when key is an object with a non-function exec property in the mutated code', () => {
    const obj = { foo: 'bar' };
    const key = { exec: "" };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBe(key); 
  });
});