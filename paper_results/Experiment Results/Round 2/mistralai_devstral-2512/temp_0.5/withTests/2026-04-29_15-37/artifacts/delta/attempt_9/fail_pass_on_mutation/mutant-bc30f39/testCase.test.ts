import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('should return empty array when iterator is exhausted', () => {
    const delta = new Delta().insert('test');
    const iterator = new OpIterator(delta.ops);
    iterator.next(4);
    expect(iterator.hasNext()).toBe(false);
    const result = iterator.rest();
    expect(result).toEqual([]);
  });
});