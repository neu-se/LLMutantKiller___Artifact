import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with null retain object', () => {
  it('should handle retain object with null value by treating it as non-object', () => {
    const ops = [{ retain: null }];
    const iterator = new OpIterator(ops);
    const result = iterator.next();
    // In the original code, null !== null evaluates to false, so it should fall through to insert
    // In the mutated code, true is always true, so it will treat null as a retain object
    expect(result).toEqual({ insert: undefined });
  });
});