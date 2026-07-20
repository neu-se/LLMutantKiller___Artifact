import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType', () => {
  it('should return "insert" for null retain value', () => {
    const ops = [{ retain: null }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toEqual('insert');
  });
});