import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('optimization correctly passes through inserts before a delete when other starts with plain retain', () => {
    // With the optimization: leading inserts from `this` fitting within firstOther.retain
    // are pushed directly to ops before the main loop, bypassing normal processing.
    // The key observable difference occurs when `this` has inserts followed by a delete,
    // and `other` starts with a plain retain that exactly covers those inserts.
    // Without optimization, the delete in `this` gets processed against the retain in `other`.
    const a = new Delta().insert('A').insert('B').delete(1);
    const b = new Delta().retain(2).delete(1);
    const expected = new Delta().insert('A').insert('B').delete(2);
    expect(a.compose(b)).toEqual(expected);
  });
});