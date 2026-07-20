import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('next() with retain object', () => {
    const ops = [
      { retain: { delta: [{ insert: 'a' }] } },
      { retain: null },
    ];
    const iterator = new OpIterator(ops);
    const nextOp = iterator.next();
    expect(nextOp.retain).toEqual({ delta: [{ insert: 'a' }] });
    const nextOp2 = iterator.next();
    expect(nextOp2).toEqual({ retain: Infinity });
  });
});