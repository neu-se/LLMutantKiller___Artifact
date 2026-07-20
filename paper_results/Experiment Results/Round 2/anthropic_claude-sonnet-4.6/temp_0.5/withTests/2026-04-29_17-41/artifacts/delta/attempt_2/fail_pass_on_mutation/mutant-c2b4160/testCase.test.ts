import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts";

describe('OpIterator', () => {
  it('rest() returns remaining ops from current position when offset is 0', () => {
    const ops = [
      { insert: 'Hello', attributes: { bold: true } },
      { retain: 3 },
      { delete: 4 },
    ];
    const iter = new OpIterator(ops);
    // Consume the first op entirely (offset becomes 0, index moves to 1)
    iter.next(5);
    // Now offset === 0, so rest() should return ops from index 1 onward
    const result = iter.rest();
    expect(result).toEqual([
      { retain: 3 },
      { delete: 4 },
    ]);
  });
});