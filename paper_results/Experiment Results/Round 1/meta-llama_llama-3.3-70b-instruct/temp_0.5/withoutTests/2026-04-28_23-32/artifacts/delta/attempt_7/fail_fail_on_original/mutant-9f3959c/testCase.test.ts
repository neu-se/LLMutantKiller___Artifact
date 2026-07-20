import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should compose attribute maps correctly', () => {
    const a = { foo: undefined };
    const b = { foo: 'qux', quux: 'corge' };
    const result = AttributeMap.compose(a, b, true);
    expect(result).toEqual({ foo: undefined, quux: 'corge' });
  });
});