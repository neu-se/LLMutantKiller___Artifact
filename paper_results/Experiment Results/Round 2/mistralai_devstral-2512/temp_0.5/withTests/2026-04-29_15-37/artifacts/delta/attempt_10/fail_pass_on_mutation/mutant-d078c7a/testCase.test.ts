import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with retain object', () => {
  it('should handle retain object with null value in mixed operations', () => {
    const ops = [
      { insert: 'before' },
      { retain: { figure: true } },
      { insert: 'after' }
    ];
    const iterator = new OpIterator(ops);
    iterator.next(6); // Skip first insert
    const retainResult = iterator.next();
    expect(retainResult).toEqual({ retain: { figure: true } });
    const afterResult = iterator.next();
    expect(afterResult).toEqual({ insert: 'after' });
  });
});