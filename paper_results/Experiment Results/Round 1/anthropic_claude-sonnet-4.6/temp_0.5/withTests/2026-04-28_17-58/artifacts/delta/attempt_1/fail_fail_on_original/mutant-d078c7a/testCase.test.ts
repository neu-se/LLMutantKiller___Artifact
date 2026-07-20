import OpIterator from "../src/OpIterator";

describe('OpIterator', () => {
  it('next() with retain null should not treat null as object retain', () => {
    // An op with retain: null - typeof null === 'object' but null !== null is false
    // Original: falls to else branch, returns { insert: undefined }
    // Mutated: treats as object retain, returns { retain: null }
    const iter = new OpIterator([{ retain: null as any }]);
    const result = iter.next();
    // In original code, null retain falls to the final else branch
    // returning { insert: nextOp.insert } which is { insert: undefined }
    // In mutated code, it returns { retain: null }
    expect(result).not.toEqual({ retain: null });
    expect(result).toEqual({});
  });
});