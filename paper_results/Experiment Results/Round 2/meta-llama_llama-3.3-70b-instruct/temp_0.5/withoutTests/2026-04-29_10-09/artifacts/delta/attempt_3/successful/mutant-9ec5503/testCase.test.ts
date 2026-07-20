import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose with other delta', () => {
    const delta1 = new Delta().insert('Hello, ');
    const delta2 = new Delta().retain(0);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
  });
});