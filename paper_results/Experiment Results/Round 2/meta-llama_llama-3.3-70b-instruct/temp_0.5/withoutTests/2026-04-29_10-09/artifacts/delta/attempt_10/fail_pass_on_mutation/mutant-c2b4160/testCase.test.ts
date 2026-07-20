import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct rest operations when offset is 0 and index is 0, and then reset index and offset', () => {
    const ops: Op[] = [
      { insert: 'Hello' },
      { delete: 1 },
      { retain: 2 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    iterator.rest();
    iterator.index = 0;
    iterator.offset = 0;
    const rest = iterator.rest();
    expect(rest.length).toBe(3);
  });
});