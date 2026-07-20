import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return remaining operations when hasNext is false', () => {
    const ops = [{ retain: 5 }];
    const iterator = new Iterator(ops);
    iterator.next(5); // Consume all operations
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});