import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation with index', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'old' }, { insert: 'middle' }];
    delta.push({ insert: 'new' });
    expect(delta.ops.length).toEqual(3);
    expect(delta.ops[0]).toEqual({ insert: 'old' });
    expect(delta.ops[1]).toEqual({ insert: 'middle' });
    expect(delta.ops[2]).toEqual({ insert: 'new' });
  });
});