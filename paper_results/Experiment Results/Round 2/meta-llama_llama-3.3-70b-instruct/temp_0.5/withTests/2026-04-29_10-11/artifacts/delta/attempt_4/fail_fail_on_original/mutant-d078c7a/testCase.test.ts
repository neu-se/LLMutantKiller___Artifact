import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('next() with retain object', () => {
    const ops = [
      { retain: null },
      { retain: { delta: [{ insert: 'a' }] } },
    ];
    const iterator = new OpIterator(ops);
    const nextOp = iterator.next();
    expect(nextOp.retain).toBeNull();
    const nextOp2 = iterator.next();
    expect(nextOp2.retain).toEqual({ delta: [{ insert: 'a' }] });
  });
});