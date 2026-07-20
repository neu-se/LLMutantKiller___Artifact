import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('next() with retain object', () => {
    const ops = [
      { retain: null },
    ];
    const iterator = new OpIterator(ops);
    const nextOp = iterator.next();
    expect(nextOp).toEqual({ retain: null });
  });
});