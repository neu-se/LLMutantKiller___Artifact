import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('should append new op when index equals ops length', () => {
    const delta = new Delta().insert('a');
    delta.push({ insert: 'b', attributes: { bold: true } });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ insert: 'a' });
    expect(delta.ops[1]).toEqual({ insert: 'b', attributes: { bold: true } });
  });
});