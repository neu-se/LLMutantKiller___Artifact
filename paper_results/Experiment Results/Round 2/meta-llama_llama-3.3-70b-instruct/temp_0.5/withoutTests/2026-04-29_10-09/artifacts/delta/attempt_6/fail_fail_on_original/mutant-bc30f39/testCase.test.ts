import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should throw an error when hasNext is false and rest is called', () => {
    const ops: Op[] = [];
    const iterator = new Iterator(ops);
    expect(() => {
      if (!iterator.hasNext()) {
        iterator.rest();
      }
    }).toThrowError();
  });
});