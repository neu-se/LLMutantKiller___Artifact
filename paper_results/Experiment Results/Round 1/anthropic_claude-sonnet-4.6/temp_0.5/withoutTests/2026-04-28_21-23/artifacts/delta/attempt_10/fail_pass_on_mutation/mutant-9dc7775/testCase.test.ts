import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not throw when thisData is a number and otherData is an empty object retain', () => {
    const a = new Delta().retain(1);
    const b = new Delta();
    (b as any).ops = [{ retain: {} }]; // empty object retain

    // Original: typeof 1 === 'object' is false → skip → no throw
    // Mutated: true && true && 1 !== null && typeof {} === 'object' && {} !== null → enters block
    //          Object.keys(1)[0] === Object.keys({})[0] → undefined === undefined → TRUE
    //          getHandler(undefined) → THROWS (no handler registered)
    expect(() => a.transform(b, false)).not.toThrow();
  });
});