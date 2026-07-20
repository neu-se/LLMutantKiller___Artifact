import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should handle identical delta instances with same ops reference', () => {
    const delta = new Delta().insert('A').insert('B', { bold: true });
    const sameDelta = delta;
    const result = delta.diff(sameDelta);
    expect(result.ops).toEqual([]);
  });
});