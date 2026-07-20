import { prop } from '../../../util/prop';

describe('prop function', () => {
  it('should correctly handle regular expressions as keys', () => {
    const obj = 'hello world';
    const func = prop(/world/);
    expect(func(obj)).toBe('world');

    // This should pass on the original code and fail on the mutated code
    const func2 = prop({});
    expect(() => func2('hello world')).toThrowError();
  });
});