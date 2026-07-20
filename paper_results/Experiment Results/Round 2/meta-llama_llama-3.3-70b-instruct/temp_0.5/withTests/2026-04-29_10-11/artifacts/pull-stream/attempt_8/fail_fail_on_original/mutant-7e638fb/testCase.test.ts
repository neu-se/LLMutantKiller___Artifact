import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should correctly handle regular expressions as keys', () => {
    const obj = { a: 'hello world' };
    const func = prop('a');
    expect(func(obj)).toBe('hello world');

    const regex = /world/;
    const func2 = prop(regex);
    expect(func2('hello world')).toBe('world');

    // This should pass on the original code and fail on the mutated code
    const emptyObj = {};
    const func3 = prop(emptyObj);
    expect(() => func3('hello world')).toThrowError();
  });
});