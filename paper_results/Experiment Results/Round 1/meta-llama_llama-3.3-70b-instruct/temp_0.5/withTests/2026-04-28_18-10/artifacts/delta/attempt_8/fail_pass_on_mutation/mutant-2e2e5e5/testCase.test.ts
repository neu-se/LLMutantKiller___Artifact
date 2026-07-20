import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    try {
      a.diff(b);
    } catch (e) {
      expect(e.message).not.toContain('with');
    }
  });
});