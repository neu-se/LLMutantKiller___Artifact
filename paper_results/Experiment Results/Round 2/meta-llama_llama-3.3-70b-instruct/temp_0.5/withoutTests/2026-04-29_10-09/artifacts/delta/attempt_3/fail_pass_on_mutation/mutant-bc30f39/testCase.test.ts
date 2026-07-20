import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return an empty array when there are no operations', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    expect(iterator.rest()).toEqual([]);
  });
});