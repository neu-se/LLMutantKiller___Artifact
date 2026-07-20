import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() with zero offset', () => {
  it('should return remaining ops when offset is zero and index is 0', () => {
    const delta = new Delta()
      .insert('Hello', { bold: true })
      .retain(3)
      .insert({ embed: 2 }, { src: 'http://quilljs.com/' })
      .delete(4);
    const iterator = new OpIterator(delta.ops);
    expect(iterator.offset).toBe(0);
    expect(iterator.index).toBe(0);
    const remainingOps = iterator.rest();
    expect(remainingOps).toEqual(delta.ops);
  });
});