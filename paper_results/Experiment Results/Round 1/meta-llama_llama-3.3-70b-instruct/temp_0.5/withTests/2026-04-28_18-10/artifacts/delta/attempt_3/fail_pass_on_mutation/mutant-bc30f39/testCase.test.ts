import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('rest() when hasNext() is false', () => {
    const ops = [{ insert: 'Hello' }];
    const iterator = new OpIterator(ops);
    iterator.next();
    expect(iterator.rest()).toEqual([]);
  });
});