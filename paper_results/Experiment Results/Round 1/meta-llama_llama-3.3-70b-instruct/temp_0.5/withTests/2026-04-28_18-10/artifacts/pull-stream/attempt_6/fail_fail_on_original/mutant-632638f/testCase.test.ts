import { prop } from "../../util/prop";

describe('prop function', () => {
  it('should return a function that returns the value of the given key', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    expect(func(obj)).toBe(1);
  });

  it('should return undefined for mutated code', () => {
    const obj = { a: 1, b: 2 };
    const func = prop('a');
    // If the mutated code returns undefined for a valid key, the test should fail
    expect(func(obj)).not.toBeUndefined();
  });
});