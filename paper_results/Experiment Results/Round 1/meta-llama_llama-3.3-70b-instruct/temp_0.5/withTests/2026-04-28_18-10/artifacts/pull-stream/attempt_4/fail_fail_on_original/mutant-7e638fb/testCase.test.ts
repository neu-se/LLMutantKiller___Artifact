import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop', () => {
  it('should return undefined when key is an object', () => {
    const obj = { foo: 'bar', baz: 'qux' };
    const fooProp = prop({});
    expect(fooProp(obj)).toBeUndefined();
  });
});