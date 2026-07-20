import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('should append operation when no merge occurs', () => {
    const delta = new Delta().insert('a');
    delta.push({ insert: 'b', attributes: { bold: true } });
    expect(delta.ops).toEqual([
      { insert: 'a' },
      { insert: 'b', attributes: { bold: true } }
    ]);
  });
});