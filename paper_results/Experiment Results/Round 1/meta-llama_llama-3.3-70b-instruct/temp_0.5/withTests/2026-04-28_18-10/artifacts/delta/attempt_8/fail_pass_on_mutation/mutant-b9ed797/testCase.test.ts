import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation to empty delta', () => {
    const delta = new Delta();
    delta.ops = [];
    delta.push({ insert: 'test' });
    expect(delta.ops.length).toEqual(1);
  });
});