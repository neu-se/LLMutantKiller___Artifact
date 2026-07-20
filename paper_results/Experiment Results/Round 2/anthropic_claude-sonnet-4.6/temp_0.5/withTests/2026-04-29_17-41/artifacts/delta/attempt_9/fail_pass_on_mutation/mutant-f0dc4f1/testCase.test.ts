import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType with empty op object', () => {
  it('returns insert for an op with no delete or retain property', () => {
    // An op {} has no delete, no retain, so should return 'insert'
    // In original: falls to else { return 'insert' }
    // In mutated: same path
    const iter = new OpIterator([{}]);
    expect(iter.peekType()).toBe('insert');
  });
});