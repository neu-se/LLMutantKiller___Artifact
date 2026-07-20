import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should compose attribute maps correctly', () => {
    const a = { foo: 'bar', baz: undefined };
    const b = { foo: 'qux', quux: 'corge', baz: null };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: 'qux', quux: 'corge', baz: null });
  });
});