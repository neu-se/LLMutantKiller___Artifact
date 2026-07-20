import { prop } from "../../../util/prop";

describe('prop', () => {
  it('should return undefined when key is an object without an exec method in the original code but return the object itself in the mutated code', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop({});
    expect(fooProp(obj)).toBeUndefined();
  });
});