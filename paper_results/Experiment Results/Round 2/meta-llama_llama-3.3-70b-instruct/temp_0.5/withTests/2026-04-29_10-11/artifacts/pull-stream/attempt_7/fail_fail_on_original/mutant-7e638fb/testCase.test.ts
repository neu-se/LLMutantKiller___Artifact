import { prop } from '../../util/prop';

describe('prop function', () => {
  it('should correctly handle regular expressions as keys', () => {
    const obj = { a: 'hello world' };
    const func = prop('a');
    expect(func(obj)).toBe('hello world');

    const regex = /world/;
    expect(() => prop(regex)('hello world')).not.toThrow();
    expect(prop(regex)('hello world')).toBe('world');

    // This should pass on the original code and fail on the mutated code
    const emptyObj = {};
    expect(prop(emptyObj)('hello world')).toBe(emptyObj);
  });
});