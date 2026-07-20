import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('rest() with no next operations', () => {
    const ops = [];
    const iterator = new OpIterator(ops);
    expect(iterator.rest()).toEqual([]);
  });
});