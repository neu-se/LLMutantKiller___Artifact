import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.transform()', () => {
  it('returns undefined when attributes is empty and priority is true', () => {
    const result = AttributeMap.transform({ bold: true }, { bold: true }, true);
    expect(result).toEqual(undefined);
  });
});