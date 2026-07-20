import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should correctly invert attributes', () => {
    const attr: AttributeMap = { a: 1, b: 2, c: 3 };
    const base: AttributeMap = { a: 1, b: 4, d: undefined };
    const result = AttributeMap.invert(attr, base);
    expect(result.c).toBeNull();
  });
});