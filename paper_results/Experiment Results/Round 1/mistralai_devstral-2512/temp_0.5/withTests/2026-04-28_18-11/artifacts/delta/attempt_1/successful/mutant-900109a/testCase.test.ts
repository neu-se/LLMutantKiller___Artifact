import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('should handle non-object input for first argument', () => {
    const result = AttributeMap.compose('not an object', { bold: true });
    expect(result).toEqual({ bold: true });
  });
});