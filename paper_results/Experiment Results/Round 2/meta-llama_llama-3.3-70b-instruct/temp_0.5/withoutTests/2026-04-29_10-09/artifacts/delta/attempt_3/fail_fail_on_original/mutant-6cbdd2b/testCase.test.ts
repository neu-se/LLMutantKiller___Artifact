import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle compose correctly when firstOther.retain is not a number', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');
    const delta2 = new Delta();
    delta2.retain({ image: 'image1' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(2);
    expect(composedDelta.ops[0].insert).toBe('Hello');
    expect(composedDelta.ops[1].retain).toEqual({ image: 'image1' });
  });
});