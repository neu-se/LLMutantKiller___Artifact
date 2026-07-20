import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('handles non-object first argument by treating it as empty object', () => {
    const result = AttributeMap.compose('not an object', { bold: true });
    expect(result).toEqual({ bold: true });
  });
});