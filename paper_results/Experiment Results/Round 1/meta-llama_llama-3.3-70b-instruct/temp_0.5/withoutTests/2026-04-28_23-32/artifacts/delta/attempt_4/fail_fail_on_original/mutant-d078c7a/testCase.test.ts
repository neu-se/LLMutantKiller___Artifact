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
    iterator.offset = 1;
    const nextOp = iterator.next(1);
    expect(nextOp.retain).toBeUndefined();
  });
});