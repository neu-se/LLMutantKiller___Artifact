import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('B');
    const result = a.diff(b);
    expect(result.toString()).not.toContain('with');
  });
});