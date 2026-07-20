import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('next() with retain object', () => {
    const ops = [
      { retain: { delta: [{ insert: 'a' }] } },
    ];
    const iterator = new OpIterator(ops);
    const nextOp = iterator.next();
    expect(nextOp.retain).toBeDefined();
  });
});