import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the rest of operations when offset is 0 and index is 0, without modifying the iterator state', () => {
    const ops: Op[] = [
      { insert: 'Hello' },
      { delete: 1 },
      { retain: 2 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    const rest = iterator.rest();
    expect(iterator.index).toBe(0);
    expect(iterator.offset).toBe(0);
  });
});