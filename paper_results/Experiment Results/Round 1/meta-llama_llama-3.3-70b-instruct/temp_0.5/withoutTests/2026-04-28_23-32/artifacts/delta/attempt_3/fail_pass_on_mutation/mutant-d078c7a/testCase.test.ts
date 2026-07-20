import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";
import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator', () => {
  it('should handle retain object correctly', () => {
    const ops: Op[] = [
      {
        retain: {}
      }
    ];
    const iterator = new Iterator(ops);
    const nextOp = iterator.next();
    expect(nextOp.retain).toEqual(ops[0].retain);
    expect(nextOp.retain).not.toBeNull();
  });
});