import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('OpIterator peekType', () => {
  it('should correctly identify retain type for object retain with attributes', () => {
    const ops = [{ retain: { figure: true }, attributes: { src: 'http://quilljs.com/image.png' } }];
    const iterator = new OpIterator(ops);
    expect(iterator.peekType()).toEqual('retain');
  });
});