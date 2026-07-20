import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts"

describe('OpIterator next() with null retain', () => {
  it('should treat null retain as insert, not as object retain', () => {
    // Create an op with retain: null - typeof null === 'object' in JS
    // Original code: nextOp.retain !== null check prevents null from being treated as object retain
    // Mutated code: null check removed, so null retain would be treated as object retain
    const ops = [{ retain: null as any, insert: 'hello' }];
    const iter = new Iterator(ops);
    
    const result = iter.next();
    
    // In original code: retain is null, so typeof retain === 'object' && retain !== null is false
    // Falls through to insert branch: retOp.insert = nextOp.insert.substr(0, length)
    // In mutated code: typeof retain === 'object' && true is true
    // Sets retOp.retain = null
    expect(result.retain).toBeUndefined();
    expect(result.insert).toBe('hello');
  });
});