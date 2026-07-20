import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('returns insert string length when retain is explicitly null', () => {
    // Parse from JSON to ensure retain is truly null (not undefined)
    const op = JSON.parse('{"insert":"hello world","retain":null}') as any;
    // Original: typeof null === 'object' && null !== null => false, falls to else => returns 11
    // Mutated:  typeof null === 'object' && true => true, returns 1
    expect(Op.length(op)).toEqual(11);
  });
});