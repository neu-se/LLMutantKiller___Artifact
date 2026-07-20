import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.invert()', () => {
  it('should handle attributes where base has undefined value and attribute has different value', () => {
    const attributes = { test: 'value' };
    const base = { test: undefined };
    const result = AttributeMap.invert(attributes, base);
    expect(result).toEqual({ test: null });
  });
});