import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return the correct rest operations when offset is zero', () => {
    const ops: Op[] = [
      { retain: 1 },
      { insert: 'hello' },
      { delete: 1 },
    ];
    const iterator = new OpIterator(ops);
    iterator.offset = 0;
    iterator.index = 0;
    const restOps = iterator.rest();
    expect(restOps.length).toBe(3);
    expect(restOps[0]).toEqual({ retain: 1 });
    expect(restOps[1]).toEqual({ insert: 'hello' });
    expect(restOps[2]).toEqual({ delete: 1 });
  });
});