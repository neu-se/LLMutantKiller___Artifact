import OpIterator from "../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('next() with null retain should fall to else branch, not object retain branch', () => {
    // typeof null === 'object' is true in JS, so the condition
    // `typeof nextOp.retain === 'object' && nextOp.retain !== null`
    // should be false for null (original), but with mutation `true` replaces
    // `nextOp.retain !== null`, making the condition true for null retain.
    const iter = new OpIterator([{ retain: null as any }]);
    const result = iter.next();
    // Original: null retain does NOT satisfy `nextOp.retain !== null`,
    // falls to final else branch, returns { insert: undefined } => {}
    // Mutated: null retain satisfies `true`, returns { retain: null }
    expect(result).not.toEqual({ retain: null });
  });
});