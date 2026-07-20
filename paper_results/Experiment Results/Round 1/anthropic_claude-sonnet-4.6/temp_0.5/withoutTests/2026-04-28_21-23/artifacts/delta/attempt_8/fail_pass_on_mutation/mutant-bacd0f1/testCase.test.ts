import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly transform when thisOp is object retain and otherOp is numeric retain without attributes', () => {
    Delta.registerEmbed('block', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,  
      transform: (_a: unknown, b: unknown, _p: boolean) => b,
    });

    // thisOp: object retain (length 1)
    // otherOp: numeric retain 1 (no attributes -> will be chopped)
    // In else branch:
    //   length = min(1, 1) = 1
    //   thisData = {block: ...}, otherData = 1
    //   Original: typeof 1 === 'object' && 1 !== null = false -> transformedData = length = 1
    //   Mutated:  typeof 1 === 'object' || 1 !== null = true  -> transformedData = otherData = 1
    //   Both give 1. Chop removes -> []
    // NOT distinguishable

    // Try with attributes on other to prevent chop:
    // otherOp: numeric retain 1 with attributes
    //   transformedData = 1 in both cases
    //   delta.retain(1, {bold:true}) -> [{retain:1, attributes:{bold:true}}]
    // Still same.

    // The ONLY way to distinguish: make otherData !== length
    // For object retain: otherData = {block:...}, length = 1
    // Original: true -> transformedData = {block:...}
    // Mutated: true -> transformedData = {block:...}
    // Same!

    // I cannot find a distinguishing case. Submitting best effort:
    const a = new Delta().retain({ block: { x: 1 } });
    const b = new Delta().retain(1, { bold: true });

    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 1, attributes: { bold: true } }]);

    Delta.unregisterEmbed('block');
  });
});