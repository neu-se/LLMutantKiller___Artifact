import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return remaining operations including partial operation when offset is non-zero', () => {
    const ops = [
      { insert: 'hello world' },
      { retain: 5 }
    ];
    const iterator = new Iterator(ops);
    iterator.next(6); // Consume part of first op
    const result = iterator.rest();
    expect(result).toEqual([
      { insert: 'world' },
      { retain: 5 }
    ]);
  });
});