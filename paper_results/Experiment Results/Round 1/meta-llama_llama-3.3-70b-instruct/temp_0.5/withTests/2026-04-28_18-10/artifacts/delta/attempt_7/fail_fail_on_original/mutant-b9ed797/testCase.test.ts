import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation with delete and insert', () => {
    const delta = new Delta();
    delta.push({ delete: 1 });
    delta.push({ insert: 'new' });
    expect(delta.ops).toEqual([{ delete: 1 }, { insert: 'new' }]);
  });
});