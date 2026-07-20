import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 for an insert op with a null retain (object type check)", () => {
    // The mutation changes `op.retain !== null` check to `true`,
    // meaning that when retain is null, the mutated code would still enter
    // the `typeof op.retain === 'object'` branch and return 1 incorrectly
    // instead of falling through to the insert branch.
    
    // With the original code: retain === null doesn't match the object branch,
    // so it falls through to the insert branch and returns the string length.
    // With the mutated code: retain === null would match (since `true` replaces `op.retain !== null`),
    // and would return 1 instead of the string's actual length.
    
    // We need an op where retain is null (object type) but insert is a string.
    // Actually, let's think differently: the mutation affects the case where
    // retain is null. In the original, null retain falls through to insert check.
    // In the mutated version, null retain returns 1 from the object branch.
    
    const op: any = {
      retain: null,
      insert: "hello" // length 5
    };
    
    // Original: typeof null === 'object' && null !== null => false, falls to insert branch => 5
    // Mutated: typeof null === 'object' && true => true, returns 1
    expect(Op.length(op)).toBe(5);
  });
});