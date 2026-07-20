import { prop } from "../../../util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the given key', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).toBe(1);
    const mutatedFunc = prop('a');
    expect(mutatedFunc(obj)).not.toBeUndefined();
  });
});