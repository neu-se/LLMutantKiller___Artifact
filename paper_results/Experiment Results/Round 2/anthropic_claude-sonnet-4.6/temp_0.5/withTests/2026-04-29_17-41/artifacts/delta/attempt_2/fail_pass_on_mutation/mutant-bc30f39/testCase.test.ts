import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('returns empty array when iterator has no more elements', () => {
    const delta = new Delta()
      .insert('Hello', { bold: true })
      .retain(3)
      .delete(4);

    const iter = new OpIterator(delta.ops);
    // Consume all ops
    iter.next(5);
    iter.next(3);
    iter.next(4);

    // Now hasNext() should be false, rest() should return []
    expect(iter.hasNext()).toEqual(false);
    expect(iter.rest()).toEqual([]);
  });
});