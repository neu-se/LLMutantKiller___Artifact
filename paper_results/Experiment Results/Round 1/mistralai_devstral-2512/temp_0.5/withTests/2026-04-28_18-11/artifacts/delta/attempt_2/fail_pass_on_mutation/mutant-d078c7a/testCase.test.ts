import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with retain object', () => {
  it('should handle retain object with null value correctly', () => {
    const ops = [{ retain: { figure: true } }];
    const iterator = new OpIterator(ops);
    const result = iterator.next();
    expect(result).toEqual({ retain: { figure: true } });
  });
});