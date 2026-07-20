import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation to delta and check length', () => {
    const delta = new Delta();
    delta.push({ insert: 'test' });
    expect(delta.ops.length).toBeGreaterThan(0);
  });
});