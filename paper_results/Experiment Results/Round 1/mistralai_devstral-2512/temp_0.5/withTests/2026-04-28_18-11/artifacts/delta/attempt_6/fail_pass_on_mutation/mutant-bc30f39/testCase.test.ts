import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('should return empty array when hasNext() is false due to exhausted operations', () => {
    const delta = new Delta().insert('a').retain(1);
    const iterator = new OpIterator(delta.ops);
    iterator.next(1);
    iterator.next(1);
    expect(iterator.hasNext()).toBe(false);
    const result = iterator.rest();
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});