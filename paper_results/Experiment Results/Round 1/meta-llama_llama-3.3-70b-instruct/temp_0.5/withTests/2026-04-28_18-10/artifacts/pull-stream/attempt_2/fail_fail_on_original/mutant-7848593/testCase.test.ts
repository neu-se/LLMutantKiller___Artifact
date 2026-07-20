import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should correctly handle the case where key is an object with a function exec property', () => {
    const obj = { foo: 'bar' };
    const key = { exec: () => null };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBeUndefined();
  });

  it('should correctly handle the case where key is an object with an empty string exec property', () => {
    const obj = { foo: 'bar' };
    const key = { exec: "" };
    const extractProp = prop(key);
    expect(extractProp(obj)).toBe(obj); // This should fail on the mutated code
  });
});