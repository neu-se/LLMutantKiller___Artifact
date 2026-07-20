import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('should return empty delta when comparing identical delta instances', () => {
    const delta = new Delta().insert('A').insert('B', { bold: true });
    const sameDelta = delta;
    const result = delta.diff(sameDelta);
    expect(result.ops).toEqual([]);
  });
});