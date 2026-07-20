import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.transform()', () => {
  it('should return undefined when transformed attributes are empty', () => {
    const a = { bold: true };
    const b = { bold: null };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});