import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation with consecutive inserts', () => {
    const delta = new Delta();
    delta.push({ insert: 'old' });
    delta.push({ insert: 'new' });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ insert: 'oldnew' });
  });
});