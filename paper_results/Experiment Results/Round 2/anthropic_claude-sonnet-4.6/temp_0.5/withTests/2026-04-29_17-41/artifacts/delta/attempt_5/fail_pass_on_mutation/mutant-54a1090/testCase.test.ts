import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('this has multiple small inserts, other starts with large plain retain', () => {
    // a has 3 single-char inserts (total length 3)
    // b starts with retain(3) - a plain retain covering all of a's inserts
    // With original: optimization pushes inserts from thisIter via the if branch
    // With mutation false: falls to else branch, processes differently
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).delete(3).insert('XYZ');
    const expected = new Delta().insert('ABC').delete(3).insert('XYZ');
    expect(a.compose(b)).toEqual(expected);
  });
});