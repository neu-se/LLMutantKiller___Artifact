import Delta from '../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose two deltas', () => {
    const delta1 = new Delta().insert('Hello, ', { bold: true });
    const delta2 = new Delta().insert('world!', { italic: true });
    const composedDelta = delta1.compose(delta2);
    const expectedDelta = new Delta().insert('Hello, ', { bold: true }).insert('world!', { italic: true });
    expect(composedDelta.ops).toEqual(expectedDelta.ops);
  });
});