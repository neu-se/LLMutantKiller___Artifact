import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return the correct rest operations when offset is zero and index is at the last operation', () => {
    const ops: Op[] = [
      { retain: 1 },
      { insert: 'hello' },
      { delete: 1 },
    ];
    const iterator = new OpIterator(ops);
    iterator.index = 2;
    iterator.offset = 0;
    const restOps = iterator.rest();
    expect(restOps.length).toBe(1);
    expect(restOps[0]).toEqual({ delete: 1 });
  });
});