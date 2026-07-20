import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Iterator rest method', () => {
  it('should return correct operations when offset is non-zero', () => {
    const ops = [
      { insert: 'hello' },
      { insert: ' world' }
    ];
    const iterator = new Iterator(ops);
    iterator.next(3); // Consume part of first op
    const result = iterator.rest();
    expect(result).toEqual([
      { insert: 'lo' },
      { insert: ' world' }
    ]);
  });
});