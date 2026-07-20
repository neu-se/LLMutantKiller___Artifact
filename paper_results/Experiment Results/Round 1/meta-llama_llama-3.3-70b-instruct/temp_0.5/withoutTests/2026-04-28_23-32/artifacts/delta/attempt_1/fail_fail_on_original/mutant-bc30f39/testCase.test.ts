import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('OpIterator', () => {
  it('should return the correct rest operations when there are no more operations', () => {
    const ops: Op[] = [
      { retain: 1 },
      { insert: 'test' },
      { delete: 1 },
    ];
    const iterator = new Iterator(ops);
    iterator.index = ops.length - 1;
    iterator.offset = 1;
    const rest = iterator.rest();
    expect(rest.length).toBe(1);
    expect(rest[0]).toEqual({ retain: Infinity });
  });
});