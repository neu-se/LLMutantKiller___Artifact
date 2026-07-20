import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('returns insert string length when retain is null and insert is a string', () => {
    // Original: typeof null === 'object' && null !== null => false, falls to else => returns insert.length = 5
    // Mutated: typeof null === 'object' && true => true, returns 1 instead of 5
    const op: Op = { retain: null as unknown as number, insert: 'hello' };
    expect(Op.length(op)).toEqual(5);
  });
});