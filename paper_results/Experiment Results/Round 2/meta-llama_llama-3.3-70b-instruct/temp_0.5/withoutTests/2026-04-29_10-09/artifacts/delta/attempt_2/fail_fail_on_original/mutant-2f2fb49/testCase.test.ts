import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should handle non-object b correctly', () => {
    const a: AttributeMap.AttributeMap = { foo: 'bar' };
    const b = null;
    const result = AttributeMap.AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});