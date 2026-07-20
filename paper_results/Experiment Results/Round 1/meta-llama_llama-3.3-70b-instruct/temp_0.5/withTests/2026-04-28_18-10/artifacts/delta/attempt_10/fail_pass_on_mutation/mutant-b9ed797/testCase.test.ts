import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation to delta and check ops length', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'old' }];
    delta.push({ insert: 'new' });
    expect(delta.ops.length).toBe(1);
  });
});