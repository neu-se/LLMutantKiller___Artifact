import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct result when calling rest() with offset 0 and index 0, and the first operation is an insert', () => {
    const ops: Op[] = [
      { insert: 'Hello' },
      { delete: 1 },
      { retain: 2 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    const rest = iterator.rest();
    expect(rest[0].insert).toBe('Hello');
  });
});