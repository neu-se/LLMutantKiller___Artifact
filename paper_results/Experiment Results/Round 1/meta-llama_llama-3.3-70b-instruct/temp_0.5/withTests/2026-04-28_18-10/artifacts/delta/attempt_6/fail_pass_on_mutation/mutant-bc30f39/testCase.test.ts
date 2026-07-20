import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('rest() should return the ops array when offset is 0', () => {
    const ops = [{ insert: 'Hello' }, { insert: 'World' }];
    const iterator = new OpIterator(ops);
    expect(iterator.rest()).toEqual(ops);
  });
});