import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('preserves insert ordering when other starts with a plain retain covering leading inserts', () => {
    // a has leading inserts totaling length 2, b starts with retain(2) then inserts
    const a = new Delta().insert('AB').delete(1);
    const b = new Delta().retain(2).insert('X');
    // With optimization: inserts 'AB' are moved to front of ops, then 'X' is inserted, then delete(1)
    // Expected: insert('AB'), insert('X'), delete(1)
    const expected = new Delta().insert('AB').insert('X').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});