import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not insert empty string', () => {
    const delta = new Delta();
    delta.insert('');
    expect(delta.ops.length).toBe(0);
  });
});