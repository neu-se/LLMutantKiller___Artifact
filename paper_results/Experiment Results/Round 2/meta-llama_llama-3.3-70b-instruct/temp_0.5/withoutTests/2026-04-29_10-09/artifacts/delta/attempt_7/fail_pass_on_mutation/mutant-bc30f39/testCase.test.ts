import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return an empty array when there are no operations and hasNext is false', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    expect(iterator.hasNext()).toBe(false);
    const result = iterator.rest();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});