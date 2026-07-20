import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('handles non-object input for parameter a', () => {
    const result = AttributeMap.diff(null, { bold: true });
    expect(result).toEqual({ bold: true });
  });
});