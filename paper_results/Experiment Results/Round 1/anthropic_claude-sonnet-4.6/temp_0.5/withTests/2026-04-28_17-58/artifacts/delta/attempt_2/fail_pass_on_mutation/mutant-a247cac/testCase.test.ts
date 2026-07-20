import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain end optimization skips remaining other retains correctly', () => {
    // a has: insert 'A' (bold), insert 'B', insert 'C' (bold)
    // b has: retain 1 (no attrs), retain 1 (italic), retain 1 (color:red)
    // The optimization fires after processing retain(1) for 'A'
    // Without optimization, 'B' gets italic and 'C' gets color:red
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta()
      .retain(1)
      .retain(1, { italic: true })
      .retain(1, { color: 'red' });
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B', { italic: true })
      .insert('C', { bold: true, color: 'red' });
    expect(a.compose(b)).toEqual(expected);
  });
});