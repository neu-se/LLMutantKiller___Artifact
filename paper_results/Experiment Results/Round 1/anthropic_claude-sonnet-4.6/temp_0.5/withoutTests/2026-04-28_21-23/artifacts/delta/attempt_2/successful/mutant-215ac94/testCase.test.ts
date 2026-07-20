import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('does not apply embed handler when thisData is a number and otherData is an empty object', () => {
    const delta1 = new Delta([{ retain: 1 }]);
    const delta2 = new Delta([{ retain: {} }]);
    // Original: skips embed handler (thisData is number, not object)
    // Mutated: enters embed handler block, Object.keys(1)[0] === Object.keys({})[0] === undefined, throws
    expect(() => delta1.transform(delta2)).not.toThrow();
  });
});