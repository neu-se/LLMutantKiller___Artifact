import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType() insert', () => {
  it('should return "insert" when the current op is an insert', () => {
    const iter = new OpIterator([{ insert: 'hello' }]);
    expect(iter.peekType()).toBe('insert');
  });
});