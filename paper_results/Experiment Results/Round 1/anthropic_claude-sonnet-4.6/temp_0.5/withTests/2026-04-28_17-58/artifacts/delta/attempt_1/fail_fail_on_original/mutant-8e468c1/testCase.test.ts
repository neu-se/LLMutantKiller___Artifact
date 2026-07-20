import Delta from "../src/Delta";

describe('compose() retain start optimization', () => {
  it('should correctly copy leading inserts when other starts with a plain retain', () => {
    // 'a' has insert ops followed by a delete
    // 'b' starts with a plain retain (no attributes) covering those inserts
    // The retain start optimization should copy the insert ops from 'a' directly
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});