import { Iterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return correct retain op when nextOp.retain is an object', () => {
    const op: Op = { retain: { foo: 'bar' } };
    const iterator = new Iterator([op]);
    const nextOp = iterator.next(1);
    expect(nextOp).toEqual({ retain: { foo: 'bar' } });
  });
});