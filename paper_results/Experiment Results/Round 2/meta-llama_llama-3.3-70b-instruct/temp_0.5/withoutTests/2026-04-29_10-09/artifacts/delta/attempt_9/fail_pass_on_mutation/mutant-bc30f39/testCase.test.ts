import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should throw or return an empty array when hasNext is false', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    if (iterator.hasNext()) {
      throw new Error('hasNext should be false');
    }
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});