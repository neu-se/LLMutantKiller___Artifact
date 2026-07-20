import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('next() with retain object', () => {
    const ops = [
      { retain: { delta: [{ insert: 'a' }, { insert: 'b' }] } },
    ];
    const iterator = new OpIterator(ops);
    const nextOp = iterator.next(1);
    expect(nextOp).not.toEqual({ retain: { delta: [{ insert: 'a' }, { insert: 'b' }] } });
  });
});