import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('should return correct op when nextOp.retain is an object', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: { foo: 'bar' } },
    ];
    const iterator = new OpIterator(ops);
    iterator.next();
    const nextOp = iterator.next(1);
    expect(nextOp).toEqual({ retain: { foo: 'bar' } });
  });

  it('should return correct op when nextOp.retain is null', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: null },
    ];
    const iterator = new OpIterator(ops);
    iterator.next();
    const nextOp = iterator.next();
    expect(nextOp).not.toEqual({ retain: {} });
  });
});