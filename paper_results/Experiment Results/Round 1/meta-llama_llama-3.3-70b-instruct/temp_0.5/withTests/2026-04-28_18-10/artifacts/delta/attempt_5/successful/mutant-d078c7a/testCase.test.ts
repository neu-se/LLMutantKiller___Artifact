import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return correct op when nextOp.retain is null', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: null },
    ];
    const iterator = new OpIterator(ops);
    iterator.next();
    const nextOp = iterator.next();
    expect(nextOp.retain).toBeUndefined();
  });
});