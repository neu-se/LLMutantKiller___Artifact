import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('B');
    expect(a.diff(b)).toBeDefined();
  });
});