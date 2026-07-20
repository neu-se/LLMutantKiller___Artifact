import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator next() with null retain', () => {
  it('should not treat null retain as an object retain op', () => {
    // Create an op where retain is null - typeof null === 'object' but it's not a valid object retain
    // In original code: nextOp.retain !== null is false, so falls through to insert branch
    // In mutated code: true condition means it enters retain object branch and returns { retain: null }
    const ops = [{ retain: null as any, insert: 'hello' }];
    const iter = new Iterator(ops);
    
    const result = iter.next();
    
    // In original code, retain === null means we skip the object retain branch
    // and fall to insert branch, returning { insert: 'hello' }
    // In mutated code, we enter object retain branch and return { retain: null }
    expect(result).not.toHaveProperty('retain');
    expect(result).toHaveProperty('insert', 'hello');
  });
});