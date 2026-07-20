import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('Iterator peekType', () => {
  it('should return "insert" for an insert operation with null retain', () => {
    const ops = [{ insert: 'test', retain: null }];
    const iterator = new Iterator(ops);
    expect(iterator.peekType()).toBe('insert');
  });
});