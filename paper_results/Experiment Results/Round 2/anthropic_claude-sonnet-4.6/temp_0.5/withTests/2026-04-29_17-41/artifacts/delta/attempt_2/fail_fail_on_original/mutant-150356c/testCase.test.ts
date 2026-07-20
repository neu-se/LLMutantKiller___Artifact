import Delta from "../../../../../../../../../src/Delta";

describe('compose', () => {
  it('does not consume non-insert ops in retain start optimization', () => {
    // a starts with a delete (non-insert), b starts with a plain retain
    // The mutation would incorrectly consume the delete op in the optimization loop
    const a = new Delta().delete(2).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    // With original: delete(2) is not an insert, so optimization loop doesn't run
    // Expected: delete(2) + insert('X') + insert('Hello')
    const expected = new Delta().delete(2).insert('X').insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});