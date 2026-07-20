import Iterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator.ts"

describe('Iterator rest', () => {
  it('returns empty array when exhausted with non-zero offset somehow', () => {
    // Force offset to be non-zero while hasNext is false
    const iter = new Iterator([]);
    (iter as any).offset = 1; // force non-zero offset
    expect(iter.rest()).toEqual([]);
  });
});