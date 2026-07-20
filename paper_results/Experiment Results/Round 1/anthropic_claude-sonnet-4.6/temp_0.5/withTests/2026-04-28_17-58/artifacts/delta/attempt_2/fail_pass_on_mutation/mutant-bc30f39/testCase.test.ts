import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('returns empty array when iterator is fully exhausted', () => {
    const delta = new Delta().insert('Hello').delete(2).retain(3);
    const iter = new OpIterator(delta.ops);
    iter.next(5);
    iter.next(2);
    iter.next(3);
    expect(iter.hasNext()).toEqual(false);
    expect(iter.rest()).toEqual([]);
  });
});