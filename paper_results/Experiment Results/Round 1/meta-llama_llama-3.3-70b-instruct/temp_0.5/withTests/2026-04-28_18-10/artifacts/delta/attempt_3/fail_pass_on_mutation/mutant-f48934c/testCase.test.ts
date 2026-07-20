import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('insert empty string and then insert non-empty string', () => {
    const delta = new Delta();
    delta.insert('');
    delta.insert('test');
    expect(delta.ops.length).toBe(1);
  });
});