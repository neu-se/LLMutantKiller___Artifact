import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return an empty array when hasNext is false and rest is called', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    expect(iterator.hasNext()).toBe(false);
    const result = iterator.rest();
    if (result.length > 0) {
      throw new Error('Expected an empty array');
    }
  });
});