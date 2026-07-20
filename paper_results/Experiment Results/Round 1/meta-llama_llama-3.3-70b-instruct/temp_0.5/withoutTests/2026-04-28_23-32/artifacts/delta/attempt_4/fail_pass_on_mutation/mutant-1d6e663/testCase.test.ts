import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should correctly invert attribute maps', () => {
    const base = { a: 1, b: 2, c: undefined };
    const attr = { a: 1, b: 2 };
    const expected = {};
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual(expected);
  });
});