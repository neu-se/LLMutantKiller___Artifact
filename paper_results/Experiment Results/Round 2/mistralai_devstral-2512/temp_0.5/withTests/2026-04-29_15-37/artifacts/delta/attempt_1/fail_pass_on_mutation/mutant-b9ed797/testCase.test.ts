import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('should append new operation when no merge is possible', () => {
    const delta = new Delta().insert('a');
    delta.push({ retain: 1 });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ insert: 'a' });
    expect(delta.ops[1]).toEqual({ retain: 1 });
  });
});