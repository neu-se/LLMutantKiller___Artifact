// <Jest test file containing exactly one test case>
import OpIterator from "../src/OpIterator";
import Delta from "../src/Delta";

describe('OpIterator', () => {
  it('rest() returns empty array and does not mutate state when iterator is exhausted', () => {
    const delta = new Delta().insert('Hello');
    const iter = new OpIterator(delta.ops);
    // Consume all ops
    iter.next(5);
    // Now hasNext() is false, offset is 0, index is 1
    expect(iter.hasNext()).toEqual(false);
    // Call rest() - should return [] without side effects
    const result = iter.rest();
    expect(result).toEqual([]);
    // Call rest() again - should still return []
    const result2 = iter.rest();
    expect(result2).toEqual([]);
    // The index and offset should not have been modified
    expect(iter.index).toEqual(1);
    expect(iter.offset).toEqual(0);
  });
});