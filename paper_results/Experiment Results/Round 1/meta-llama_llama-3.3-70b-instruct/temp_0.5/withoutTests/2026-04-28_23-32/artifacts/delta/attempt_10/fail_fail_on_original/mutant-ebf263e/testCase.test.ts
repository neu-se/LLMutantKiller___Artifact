import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas when the first other operation is a retain with no attributes', () => {
    const delta1 = new Delta();
    delta1.insert('a');
    const delta2 = new Delta();
    delta2.retain(1);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(2);
  });
});