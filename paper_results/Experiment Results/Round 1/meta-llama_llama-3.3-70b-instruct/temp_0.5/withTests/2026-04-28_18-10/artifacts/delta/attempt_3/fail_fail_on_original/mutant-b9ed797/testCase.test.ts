import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation with multiple ops', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'old' }];
    delta.push({ insert: 'new' });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ insert: 'old' });
    expect(delta.ops[1]).toEqual({ insert: 'new' });
  });
});