import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('OpIterator', () => {
  it('should return "insert" when op.retain is an object and an else block is present', () => {
    const op = { retain: {}, insert: 'test' };
    const iterator = new OpIterator([op]);
    expect(iterator.peekType()).toBe('insert');
  });
});