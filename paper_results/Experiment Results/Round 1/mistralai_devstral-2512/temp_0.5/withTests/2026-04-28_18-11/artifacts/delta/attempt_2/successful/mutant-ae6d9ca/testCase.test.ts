import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('handles non-object input for parameter a', () => {
    const result = AttributeMap.diff("not an object", { bold: true });
    expect(result).toEqual({ bold: true });
  });
});