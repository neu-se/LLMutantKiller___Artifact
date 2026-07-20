import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator next() with null retain', () => {
  it('should fall through to insert branch when retain is null, not treat null as object retain', () => {
    // typeof null === 'object' is true in JavaScript
    // Original: typeof nextOp.retain === 'object' && nextOp.retain !== null
    // Mutated:  typeof nextOp.retain === 'object' && true
    // When retain is null, original falls to else (insert) branch
    // When retain is null, mutated incorrectly enters the object retain branch
    
    // An op with insert embed and retain: null
    const ops = [{ insert: { embed: 1 }, retain: null as any }];
    const iter = new OpIterator(ops);
    
    const result = iter.next();
    
    // Original: null !== null is false, falls to else: retOp.insert = nextOp.insert
    // Mutated: true, enters object retain branch: retOp.retain = null
    expect(result).toEqual({ insert: { embed: 1 } });
  });
});