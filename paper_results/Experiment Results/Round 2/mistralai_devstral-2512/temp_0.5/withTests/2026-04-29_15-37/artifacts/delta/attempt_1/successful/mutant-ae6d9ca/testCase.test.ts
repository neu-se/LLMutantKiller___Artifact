import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff()', () => {
  it('should handle non-object first argument by treating it as empty object', () => {
    const result = AttributeMap.diff('not an object', { bold: true });
    expect(result).toEqual({ bold: true });
  });
});