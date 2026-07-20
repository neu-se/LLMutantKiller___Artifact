import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('peekType returns retain causing rest() to work correctly after retain op', () => {
    const iter = new OpIterator([{ retain: 3 }]);
    // peekType() is called internally; if it returns undefined instead of 'retain'
    // for a retain op when no ops are left, the final return 'retain' is the fallback
    // Test that peekType on an actual retain op (not end of ops) returns 'retain'
    const results = [iter.peekType()];
    iter.next();
    results.push(iter.peekType()); // after exhausting ops, should return 'retain' (fallback)
    expect(results[0]).toEqual('retain'); // from the retain branch
    expect(results[1]).toEqual('retain'); // from the fallback at end of function
  });
});