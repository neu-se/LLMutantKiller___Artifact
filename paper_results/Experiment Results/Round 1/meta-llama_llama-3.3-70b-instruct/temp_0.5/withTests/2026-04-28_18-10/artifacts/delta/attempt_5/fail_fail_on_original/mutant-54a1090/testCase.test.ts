import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose two deltas correctly when first delta has a retain operation and second delta has an insert operation at the beginning', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().insert('Hello', { bold: true });
    const expected = new Delta().insert('Hello', { bold: true }).retain(5);
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});