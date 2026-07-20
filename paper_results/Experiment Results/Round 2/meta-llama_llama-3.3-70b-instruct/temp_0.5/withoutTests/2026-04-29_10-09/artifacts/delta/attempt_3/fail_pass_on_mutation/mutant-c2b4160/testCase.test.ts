import OpIterator from '../../../../../../../../../../../subject_repositories/delta/src/OpIterator';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the rest of the operations when offset is not zero and index is 0', () => {
    const ops: Op[] = [
      { insert: 'Hello' },
      { delete: 1 },
      { retain: 2 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 1;
    iterator.index = 0;
    const rest = iterator.rest();
    expect(rest.length).toBe(3);
    expect(rest[0].insert).toBe('ello');
    expect(rest[1].delete).toBe(1);
    expect(rest[2].retain).toBe(2);
  });
});