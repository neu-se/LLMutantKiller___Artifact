import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with null retain object', () => {
  it('should skip null retain objects and move to next op', () => {
    const ops = [
      { retain: null },
      { insert: 'test' }
    ];
    const iterator = new OpIterator(ops);
    // First next() should skip the null retain and return the insert op
    const result = iterator.next();
    expect(result).toEqual({ insert: 'test' });
  });
});