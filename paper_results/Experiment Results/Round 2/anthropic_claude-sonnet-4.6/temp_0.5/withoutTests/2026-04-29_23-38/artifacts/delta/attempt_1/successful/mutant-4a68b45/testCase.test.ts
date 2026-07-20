import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 for insert op with object value when retain is null", () => {
    // The mutation changes `op.retain !== null` to `true`, meaning when retain is null,
    // it would incorrectly enter the `typeof op.retain === 'object'` branch and return 1
    // instead of falling through to the insert branch.
    // 
    // With original code: retain === null => typeof null === 'object' but null !== null is false,
    // so it falls through to the insert branch.
    // With mutated code: retain === null => typeof null === 'object' && true is true,
    // so it returns 1 from the wrong branch.
    //
    // We need an insert op with a string longer than 1 character to detect this.
    // But wait - if retain is not set, typeof op.retain === 'object' would be false since retain is undefined.
    // 
    // Actually, let's think about the case where retain is explicitly null.
    // In the original: typeof null === 'object' && null !== null => 'object' && false => false
    // In the mutated: typeof null === 'object' && true => 'object' && true => true => returns 1
    //
    // So we need an op where retain is null and insert is a string with length > 1
    const op: Op = { retain: null as any, insert: "hello" };
    // Original: retain is null, typeof null === 'object' but null !== null is false,
    // so falls to insert branch: "hello".length = 5
    // Mutated: typeof null === 'object' && true => returns 1
    expect(Op.length(op)).toBe(5);
  });
});