import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return the correct rest operations when offset is zero and hasNext is false', () => {
    const ops: Op[] = [
      { retain: 1 },
      { insert: 'hello' },
      { delete: 1 },
    ];
    const iterator = new OpIterator(ops);
    iterator.index = ops.length;
    const restOps = iterator.rest();
    expect(restOps.length).toBe(0);
  });
});