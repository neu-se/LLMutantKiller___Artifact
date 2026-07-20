import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose with another delta when firstOther is null', () => {
    const delta1 = new Delta();
    delta1.retain(5);
    const delta2 = new Delta();
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.length()).toBe(5);
    const delta3 = new Delta();
    delta3.retain(3);
    const composedDelta2 = delta1.compose(delta3);
    expect(composedDelta2.length()).toBe(8);
  });
});