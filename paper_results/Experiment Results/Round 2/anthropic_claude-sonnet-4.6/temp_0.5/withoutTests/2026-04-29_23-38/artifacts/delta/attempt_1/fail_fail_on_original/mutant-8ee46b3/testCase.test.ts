import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly transform a retain-number op against a retain-number op', () => {
    // When both ops are retain with numbers, transformedData should be length (a number)
    // Original: false branch evaluates to `typeof otherData === 'object' && otherData !== null` = false
    // Mutated: false branch evaluates to `true`
    // We need to detect the difference between retain(false) and retain(true)
    const a = new Delta().retain(5);
    const b = new Delta().retain(5);
    const result = a.transform(b, false);
    // Both false and true would create {retain: false} or {retain: true}
    // Let's check what ops are produced
    expect(result.ops).toEqual([{ retain: 5 }]);
  });
});