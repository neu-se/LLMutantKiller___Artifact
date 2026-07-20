import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with null retain object', () => {
  it('should skip null retain objects and return retain Infinity', () => {
    const ops = [{ retain: null }];
    const iterator = new OpIterator(ops);
    const result = iterator.next();
    expect(result).toEqual({ retain: Infinity });
  });
});