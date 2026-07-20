import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('returns empty array when hasNext() is false even with non-zero offset', () => {
    const delta = new Delta().insert('Hello');
    const iter = new OpIterator(delta.ops);
    // Exhaust the iterator
    iter.next(5);
    // Manually set offset to non-zero to distinguish the two code paths
    iter.offset = 2;
    // hasNext() should still be false (no ops at index)
    expect(iter.hasNext()).toEqual(false);
    // Original: if (!hasNext()) return [] → returns []
    // Mutated: if (false) skipped, else if (offset === 0) false, else branch runs next() → returns [{retain: Infinity}]
    expect(iter.rest()).toEqual([]);
  });
});