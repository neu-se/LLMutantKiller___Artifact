import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct length when calling rest() with offset 0 and index 0', () => {
    const ops: Op[] = [
      { insert: 'Hello' },
      { delete: 1 },
      { retain: 2 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    const rest = iterator.rest();
    expect(rest.length).toBe(3);
    const iterator2 = new OpIterator(ops);
    iterator2.offset = 0;
    iterator2.index = 0;
    iterator2.rest();
    iterator2.offset = 0;
    iterator2.index = 0;
    const rest2 = iterator2.rest();
    expect(rest2.length).toBe(3);
  });
});