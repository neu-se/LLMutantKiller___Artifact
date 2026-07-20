import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return the correct rest operations when hasNext is false and offset is not zero', () => {
    const ops: Op[] = [
      { retain: 1 },
      { insert: 'hello' },
      { delete: 1 },
    ];
    const iterator = new OpIterator(ops);
    iterator.index = ops.length;
    iterator.offset = 1;
    const restOps = iterator.rest();
    expect(restOps.length).toBe(0);
  });
});