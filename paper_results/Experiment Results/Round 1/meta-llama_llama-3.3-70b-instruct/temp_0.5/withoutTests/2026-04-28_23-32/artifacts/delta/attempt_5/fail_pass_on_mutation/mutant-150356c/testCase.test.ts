import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta().insert('Hello, world!');
    const delta2 = new Delta().retain(7);
    const composedDelta = delta1.compose(delta2);
    const expectedOps = delta1.ops;
    expect(composedDelta.ops).toEqual(expectedOps);
  });
});