import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('insert empty string with non-string argument', () => {
    const delta = new Delta();
    delta.insert(0);
    expect(delta.ops.length).toBe(0);
  });
});