import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('OpIterator peekType()', () => {
  it('should return "retain" for object retain operation with attributes', () => {
    const delta = new Delta().retain({ figure: true }, { src: 'http://quilljs.com/image.png' });
    const iterator = new OpIterator(delta.ops);
    expect(iterator.peekType()).toBe('retain');
    iterator.next();
    expect(iterator.peekType()).toBe('retain');
  });
});