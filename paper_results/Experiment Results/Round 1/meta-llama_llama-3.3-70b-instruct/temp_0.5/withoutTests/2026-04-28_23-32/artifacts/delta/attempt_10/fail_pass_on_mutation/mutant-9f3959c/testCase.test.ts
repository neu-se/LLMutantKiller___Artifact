import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should compose attribute maps correctly', () => {
    const a = { foo: undefined, bar: 'baz' };
    const b = { foo: undefined };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ bar: 'baz' });
  });
});