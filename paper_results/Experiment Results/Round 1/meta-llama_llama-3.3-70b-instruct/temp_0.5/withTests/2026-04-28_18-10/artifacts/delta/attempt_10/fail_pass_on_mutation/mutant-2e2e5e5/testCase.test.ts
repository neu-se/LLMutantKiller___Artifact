import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() with mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('B');
    try {
      a.diff(b);
    } catch (e) {
      expect(e).toBeUndefined();
    }
    try {
      const c = new Delta().retain(1);
      a.diff(c);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toContain('on');
    }
  });
});