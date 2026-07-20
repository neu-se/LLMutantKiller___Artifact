import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return the correct rest operations when offset is zero and index is at the second last operation', () => {
    const ops: Op[] = [
      { retain: 1 },
      { insert: 'hello' },
      { delete: 1 },
    ];
    const iterator = new OpIterator(ops);
    iterator.index = 1;
    iterator.offset = 0;
    const restOps = iterator.rest();
    expect(restOps.length).toBe(2);
    expect(restOps[0]).toEqual({ insert: 'hello' });
    expect(restOps[1]).toEqual({ delete: 1 });
  });
});