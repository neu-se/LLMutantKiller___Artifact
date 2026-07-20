import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose function should handle non-object inputs correctly', () => {
    const a = { bold: true };
    const b = false;
    expect(() => AttributeMap.compose(a, b)).toThrowError('b is not an object');
  });
});