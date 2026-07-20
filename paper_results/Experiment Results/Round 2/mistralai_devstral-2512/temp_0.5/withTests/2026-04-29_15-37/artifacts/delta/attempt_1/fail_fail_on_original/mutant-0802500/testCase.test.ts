import Delta from '../../src/Delta';

describe('compose() with retain optimization', () => {
  it('should handle insert type correctly when composing with retain', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true });
    const b = new Delta().retain(2).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('D')
      .insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});