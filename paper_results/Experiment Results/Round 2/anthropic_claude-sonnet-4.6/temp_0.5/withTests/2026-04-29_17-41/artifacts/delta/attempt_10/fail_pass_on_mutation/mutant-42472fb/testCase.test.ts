import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('detects mutation in retain start optimization by checking ops array pre-population effect', () => {
    // When this starts with inserts and other starts with retain(n) where n > total insert length,
    // original advances otherIter by total insert length, leaving partial retain
    // The partial retain then gets processed against next op in this
    // Use case where this has insert then delete, other has retain covering only insert
    const a = new Delta().insert('A').insert('B').retain(1, { color: 'red' }).delete(2);
    const b = new Delta().retain(3, undefined).insert('X');
    const expected = new Delta()
      .insert('A')
      .insert('B')
      .retain(1, { color: 'red' })
      .insert('X')
      .delete(2);
    expect(a.compose(b)).toEqual(expected);
  });
});