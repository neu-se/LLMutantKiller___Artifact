import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.transform', () => {
  it('returns undefined when transform with priority results in empty attributes', () => {
    const a = { bold: true };
    const b = { bold: false };
    // With priority=true, b's keys are only included if a doesn't have them
    // a has 'bold', so 'bold' from b is excluded -> attributes = {} -> should be undefined
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});