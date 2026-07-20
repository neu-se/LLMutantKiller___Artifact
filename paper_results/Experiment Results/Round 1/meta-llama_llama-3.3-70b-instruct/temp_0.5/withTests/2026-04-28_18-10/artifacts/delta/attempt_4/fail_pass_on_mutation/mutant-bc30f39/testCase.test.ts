import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('rest() when hasNext() is false due to end of ops', () => {
    const ops = [{ insert: 'Hello' }];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.hasNext()).toBe(false);
    expect(iterator.rest()).toEqual([]);
  });
});