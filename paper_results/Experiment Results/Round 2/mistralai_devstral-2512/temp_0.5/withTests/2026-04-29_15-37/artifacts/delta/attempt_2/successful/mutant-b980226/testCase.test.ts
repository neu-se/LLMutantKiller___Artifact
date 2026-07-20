import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.transform()', () => {
  it('should return undefined when transformed attributes are empty', () => {
    const result = AttributeMap.transform({ bold: true }, { bold: true }, true);
    expect(result).toBeUndefined();
  });
});