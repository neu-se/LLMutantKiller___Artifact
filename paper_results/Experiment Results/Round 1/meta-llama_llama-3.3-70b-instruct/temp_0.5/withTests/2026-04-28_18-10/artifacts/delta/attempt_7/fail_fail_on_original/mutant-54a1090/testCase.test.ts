import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose two deltas correctly when first delta has a retain operation and second delta has an insert operation with embed', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().insert({ image: 'http://quilljs.com/image.png' });
    const expected = new Delta().insert({ image: 'http://quilljs.com/image.png' }).retain(5);
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});