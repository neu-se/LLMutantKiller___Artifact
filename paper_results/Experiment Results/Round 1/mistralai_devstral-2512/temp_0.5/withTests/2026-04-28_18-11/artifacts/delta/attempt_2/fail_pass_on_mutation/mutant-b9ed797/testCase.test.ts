import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('should append new op when index equals ops length', () => {
    const delta = new Delta().insert('a');
    delta.push({ insert: 'b' });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ insert: 'ab' });
  });
});