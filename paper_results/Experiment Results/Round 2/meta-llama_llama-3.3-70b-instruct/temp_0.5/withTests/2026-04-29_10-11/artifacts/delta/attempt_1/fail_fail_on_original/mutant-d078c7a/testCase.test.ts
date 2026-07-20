import { OpIterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';

describe('OpIterator', () => {
  it('next() with retain object', () => {
    const ops = [
      { retain: 1, attributes: { bold: true } },
      { retain: { delta: [{ insert: 'a' }] } },
    ];
    const iterator = new OpIterator(ops);
    const nextOp = iterator.next();
    expect(nextOp).toEqual({ retain: 1, attributes: { bold: true } });
    const nextOp2 = iterator.next();
    expect(nextOp2).toEqual({ retain: { delta: [{ insert: 'a' }] } });
  });
});