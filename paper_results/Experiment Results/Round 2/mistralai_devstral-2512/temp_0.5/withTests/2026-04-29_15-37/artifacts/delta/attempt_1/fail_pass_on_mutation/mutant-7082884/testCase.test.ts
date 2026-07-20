import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should return empty delta when comparing identical deltas', () => {
    const delta = new Delta().insert('A').insert('B', { bold: true });
    const result = delta.diff(delta);
    expect(result.ops).toEqual([]);
  });
});