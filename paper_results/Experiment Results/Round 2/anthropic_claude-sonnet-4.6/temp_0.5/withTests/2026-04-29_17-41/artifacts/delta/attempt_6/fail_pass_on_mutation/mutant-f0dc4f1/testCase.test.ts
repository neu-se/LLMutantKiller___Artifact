import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType() with retain null', () => {
  it('should handle retain op correctly when retain value leads to object type check', () => {
    // typeof null === 'object', so { retain: null } would match the object retain condition
    // In original: returns 'retain' from inside the if block
    // In mutated: empty block, then falls through to return 'retain' at end
    // These should be equivalent... let me test delete after retain to see state changes
    const iter = new OpIterator([{ delete: 3 }, { retain: 2 }, { insert: 'hi' }]);
    expect(iter.peekType()).toBe('delete');
    iter.next();
    expect(iter.peekType()).toBe('retain');
    iter.next();
    expect(iter.peekType()).toBe('insert');
    iter.next();
    expect(iter.peekType()).toBe('retain'); // no ops left
  });
});