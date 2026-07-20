import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return an empty array when hasNext is false', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    if (!iterator.hasNext()) {
      expect(iterator.rest()).toEqual([]);
    } else {
      throw new Error('hasNext should be false');
    }
  });
});