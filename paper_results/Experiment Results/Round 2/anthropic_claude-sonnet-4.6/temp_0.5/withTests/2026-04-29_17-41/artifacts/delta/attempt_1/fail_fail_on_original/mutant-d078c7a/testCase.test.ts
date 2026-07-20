import OpIterator from "../src/OpIterator";

describe('OpIterator next() with null retain', () => {
  it('should fall through to insert branch when retain is null, not treat null as object retain', () => {
    // typeof null === 'object' is true in JavaScript
    // Original code: typeof nextOp.retain === 'object' && nextOp.retain !== null
    // Mutated code:  typeof nextOp.retain === 'object' && true
    // When retain is null, original falls to the else (insert) branch
    // When retain is null, mutated incorrectly enters the object retain branch
    
    // Create an op with retain: null and insert: { embed: 1 }
    // This simulates an embed insert where retain happens to be null
    const ops = [{ insert: { embed: 1 }, retain: null as any }];
    const iter = new OpIterator(ops);
    
    const result = iter.next();
    
    // In original code: retain is null, typeof null === 'object' but null !== null is false,
    // so it falls to else branch: retOp.insert = nextOp.insert (the embed object)
    // In mutated code: typeof null === 'object' && true => enters object retain branch,
    // retOp.retain = nextOp.retain = null
    expect(result).toEqual({ insert: { embed: 1 } });
  });
});