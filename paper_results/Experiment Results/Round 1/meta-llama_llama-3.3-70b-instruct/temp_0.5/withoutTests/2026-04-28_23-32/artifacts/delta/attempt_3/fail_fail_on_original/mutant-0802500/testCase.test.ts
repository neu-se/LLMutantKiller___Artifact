import Delta from '../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose two deltas with a retain operation', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(3);
    const composedDelta = delta1.compose(delta2);
    const expectedDelta = new Delta().retain(5);
    expect(composedDelta.ops).toEqual(expectedDelta.ops);
  });
});