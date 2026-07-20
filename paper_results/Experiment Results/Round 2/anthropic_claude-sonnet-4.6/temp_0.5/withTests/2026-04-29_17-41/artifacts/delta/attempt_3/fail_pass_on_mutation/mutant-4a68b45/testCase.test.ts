import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('returns correct length for string insert when retain is null', () => {
    // typeof null === 'object' is true in JavaScript
    // Original: op.retain !== null is false, so falls through to else branch
    //   → returns op.insert.length = 3
    // Mutated: condition is (typeof null === 'object' && true) = true
    //   → returns 1 instead of 3
    const op: any = { insert: 'abc', retain: null };
    expect(Op.length(op)).toEqual(3);
  });
});