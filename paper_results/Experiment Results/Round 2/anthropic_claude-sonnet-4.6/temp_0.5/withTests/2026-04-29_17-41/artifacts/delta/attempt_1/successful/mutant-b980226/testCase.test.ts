import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.transform', () => {
  it('returns undefined when all keys in b are already defined in a with priority', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: false, color: 'blue' };
    // With priority=true, since all keys in b exist in a, attributes stays empty
    // Should return undefined, not {}
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});