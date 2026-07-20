import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should correctly invert attributes', () => {
    const attr: AttributeMap = { a: 1, b: 2, c: 3, d: 4 };
    const base: AttributeMap = { a: 1, b: 4, d: undefined };
    const result = AttributeMap.invert(attr, base);
    expect(Object.keys(result)).toEqual(['b', 'c', 'd']);
    expect(result.b).toBe(4);
    expect(result.c).toBeNull();
    expect(result.d).toBeUndefined();
  });
});