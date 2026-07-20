import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop', () => {
  it('should return the object itself when key is an object in the mutated code', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop({});
    expect(fooProp(obj)).not.toBeUndefined();
  });
});