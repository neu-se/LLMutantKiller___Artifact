import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should early return when comparing identical delta instances', () => {
    const delta = new Delta().insert('A').insert('B', { bold: true });
    const result = delta.diff(delta);
    expect(result.ops).toEqual([]);
  });
});