import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta().insert('Hello, world!');
    const delta2 = new Delta().delete(7);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ delete: 7 }]);
  });
});