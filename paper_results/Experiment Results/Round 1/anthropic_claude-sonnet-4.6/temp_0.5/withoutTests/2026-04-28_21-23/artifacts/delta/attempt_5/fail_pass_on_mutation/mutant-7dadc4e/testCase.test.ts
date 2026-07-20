import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform with embed retain uses otherData when it is a non-null object', () => {
    Delta.registerEmbed('bold', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b,
    });

    const thisDelta = new Delta().retain({ bold: true });
    const otherDelta = new Delta().retain({ bold: false });
    
    const result = thisDelta.transform(otherDelta, false);
    Delta.unregisterEmbed('bold');
    
    // otherData = { bold: false } - non-null object
    // Original: typeof obj === 'object' && obj !== null => true => transformedData = otherData
    // Mutated: typeof obj === 'object' && true => true => transformedData = otherData
    // Then embed handler runs: transformedData = { bold: false } (priority=false, returns b)
    expect(result.ops).toEqual([{ retain: { bold: false } }]);
  });
});