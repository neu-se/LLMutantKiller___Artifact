import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose two deltas correctly when first delta has an insert operation and second delta has a retain operation with length greater than 0', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(1);
    const expected = new Delta().insert('Hello');
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});