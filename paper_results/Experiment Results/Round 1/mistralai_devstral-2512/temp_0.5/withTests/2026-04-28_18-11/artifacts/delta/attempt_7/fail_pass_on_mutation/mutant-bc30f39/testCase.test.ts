import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest()', () => {
  it('should handle exhausted iterator correctly', () => {
    const delta = new Delta().insert('test');
    const iterator = new OpIterator(delta.ops);
    iterator.next(4);
    const rest = iterator.rest();
    expect(rest).toEqual([]);
    expect(iterator.hasNext()).toBe(false);
  });
});