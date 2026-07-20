import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('insert with attributes composed with plain retain preserves attributes via optimization', () => {
    // When 'other' starts with a plain retain that covers all of 'this' inserts,
    // the optimization path should preserve the inserts with their attributes
    const a = new Delta().insert('X', { bold: true }).insert('Y', { italic: true });
    const b = new Delta().retain(2);
    const expected = new Delta().insert('X', { bold: true }).insert('Y', { italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});