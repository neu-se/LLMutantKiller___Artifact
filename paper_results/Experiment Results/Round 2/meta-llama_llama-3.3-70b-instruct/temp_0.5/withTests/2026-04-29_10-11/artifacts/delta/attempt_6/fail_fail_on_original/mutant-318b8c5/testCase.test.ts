import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with max instead of min', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('A' + String.fromCharCode(0) + 'B');
    const result = a.diff(b);
    expect(result.ops).toEqual([
      { insert: String.fromCharCode(0) },
      { insert: 'B' },
      { delete: 1 },
    ]);
  });
});