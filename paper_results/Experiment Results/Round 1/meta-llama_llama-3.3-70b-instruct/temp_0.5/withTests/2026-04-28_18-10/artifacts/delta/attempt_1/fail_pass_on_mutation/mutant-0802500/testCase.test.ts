import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle empty first delta', () => {
    const a = new Delta();
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle empty second delta', () => {
    const a = new Delta().insert('A');
    const b = new Delta();
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle retain in first delta', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle retain in second delta', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('should handle delete in first delta', () => {
    const a = new Delta().delete(1);
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle delete in second delta', () => {
    const a = new Delta().insert('A');
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle insert in both deltas', () => {
    const a = new Delta().insert('A');
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B').insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});