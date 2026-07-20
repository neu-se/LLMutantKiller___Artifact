import { Iterator } from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct type when retain is an object and not null', () => {
    const op: Op = { retain: null };
    const iterator = new Iterator([op]);
    expect(iterator.peekType()).toBe('insert');
  });
});