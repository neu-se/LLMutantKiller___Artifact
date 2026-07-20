import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator with null retain object', () => {
  it('should handle retain object that is null', () => {
    const ops = [{ retain: null, attributes: { bold: true } }];
    const iterator = new OpIterator(ops);
    const result = iterator.next();
    expect(result).toEqual({ retain: Infinity });
  });
});