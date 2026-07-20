import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop.js';

describe('prop function', () => {
  it('should pass when prop is called with a string key and an object', () => {
    const obj = { foo: 'bar' };
    const key = 'foo';
    const result = prop(key)(obj);
    expect(result).toBe('bar');
  });

  it('should pass when prop is called with a regex and a string', () => {
    const regex = /test/;
    const str = 'this is a test string';
    const result = prop(regex)(str);
    expect(result).toBe('test');
  });

  it('should pass when prop is called with an object that has an exec method', () => {
    const obj = { exec: () => 'exec result' };
    const result = prop(obj)('string');
    expect(result).toBe('exec result');
  });

  it('should fail when prop is called with an object that is an object in the mutated code', () => {
    const obj = { foo: 'bar', exec: 'not a function' };
    const result = prop(obj)('string');
    expect(result).toBe(obj);
  });
});