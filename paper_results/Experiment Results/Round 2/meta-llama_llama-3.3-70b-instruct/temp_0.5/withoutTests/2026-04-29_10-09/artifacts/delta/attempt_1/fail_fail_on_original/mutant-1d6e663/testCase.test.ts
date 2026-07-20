import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should correctly invert attributes', () => {
    const attr: AttributeMap = { a: 1, b: 2, c: 3 };
    const base: AttributeMap = { a: 1, b: 4, d: 5 };
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({ b: 4, c: null, d: 5 });
  });
});