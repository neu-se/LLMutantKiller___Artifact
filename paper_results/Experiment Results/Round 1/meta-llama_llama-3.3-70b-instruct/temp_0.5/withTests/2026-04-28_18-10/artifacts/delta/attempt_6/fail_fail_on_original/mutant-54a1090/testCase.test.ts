import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose two deltas correctly when first delta has an insert operation and second delta has a retain operation with length 0 and attributes', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(0, { bold: true });
    const expected = new Delta().insert('Hello', { bold: true });
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});