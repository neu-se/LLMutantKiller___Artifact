import { prop } from '../../../util/prop.js';

describe('prop function', () => {
  it('should correctly handle the case where key is a regexp', () => {
    const obj = { foo: 'bar' };
    const key = /foo/;
    const extractProp = prop(key);
    expect(extractProp(obj)).toBe('bar');
  });

  it('should return key when key is an object and not a regexp', () => {
    const obj = {};
    const key = { exec: "" };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBe(key); 
  });
});