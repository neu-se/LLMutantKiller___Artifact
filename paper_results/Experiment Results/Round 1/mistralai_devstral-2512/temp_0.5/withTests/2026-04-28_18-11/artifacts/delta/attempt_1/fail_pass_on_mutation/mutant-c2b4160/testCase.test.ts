import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() with offset', () => {
  it('should return correct remaining ops when offset is non-zero', () => {
    const delta = new Delta()
      .insert('Hello', { bold: true })
      .retain(3)
      .insert({ embed: 2 }, { src: 'http://quilljs.com/' })
      .delete(4);
    const iterator = new OpIterator(delta.ops);
    iterator.next(2); // Advance by 2 characters, creating offset
    const remainingOps = iterator.rest();
    expect(remainingOps).toEqual([
      { insert: 'llo', attributes: { bold: true } },
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ]);
  });
});