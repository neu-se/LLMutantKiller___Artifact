import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.transform', () => {
  it('returns undefined when all b keys are overridden by a with priority', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: false, color: 'blue' };
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});