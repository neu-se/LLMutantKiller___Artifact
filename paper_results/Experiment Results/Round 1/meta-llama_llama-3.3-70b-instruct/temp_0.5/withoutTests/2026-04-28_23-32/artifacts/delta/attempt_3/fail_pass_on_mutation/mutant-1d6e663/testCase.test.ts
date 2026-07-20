import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should correctly invert attribute maps', () => {
    const base = { a: 1, b: 2, c: 3 };
    const attr = { a: 1, b: 2, c: 4 };
    const expected = { c: 3 };
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual(expected);
  });
});