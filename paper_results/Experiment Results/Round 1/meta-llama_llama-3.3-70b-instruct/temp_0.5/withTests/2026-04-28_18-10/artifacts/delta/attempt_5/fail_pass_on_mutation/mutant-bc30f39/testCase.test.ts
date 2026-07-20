import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('rest() when hasNext() is false due to end of ops', () => {
    const ops = [];
    const iterator = new OpIterator(ops);
    expect(iterator.rest()).toEqual([]);
    expect(iterator.hasNext()).toBe(false);
  });
});