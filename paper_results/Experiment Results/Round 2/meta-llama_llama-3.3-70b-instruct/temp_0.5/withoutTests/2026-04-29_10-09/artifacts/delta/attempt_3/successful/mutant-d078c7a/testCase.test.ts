import Iterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return correct retain op when nextOp.retain is an object', () => {
    const op: Op = { retain: null };
    const iterator = new Iterator([op]);
    const nextOp = iterator.next(1);
    expect(nextOp).not.toEqual({ retain: op.retain });
  });
});