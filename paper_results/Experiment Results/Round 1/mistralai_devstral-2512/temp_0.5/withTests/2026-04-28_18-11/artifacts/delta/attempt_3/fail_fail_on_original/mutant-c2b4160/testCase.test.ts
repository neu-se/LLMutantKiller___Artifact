import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator rest() behavior', () => {
  it('should handle offset === 0 case correctly', () => {
    const delta = new Delta()
      .insert('Hello', { bold: true })
      .retain(3)
      .insert({ embed: 2 }, { src: 'http://quilljs.com/' })
      .delete(4);
    const iterator = new OpIterator(delta.ops);
    iterator.next(0); // Create zero offset case
    const remainingOps = iterator.rest();
    expect(remainingOps).toEqual(delta.ops);
  });
});