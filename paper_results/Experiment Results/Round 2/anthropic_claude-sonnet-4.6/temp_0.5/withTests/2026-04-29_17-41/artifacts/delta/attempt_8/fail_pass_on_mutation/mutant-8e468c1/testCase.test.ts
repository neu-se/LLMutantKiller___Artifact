import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with delete at start and other starting with plain retain', () => {
  it('should not fast-path delete ops when other starts with plain retain', () => {
    // 'a' starts with a delete, then an insert
    // 'b' starts with a plain retain larger than the delete
    // Original: delete goes through main loop (gets kept as delete)
    // Mutated: delete gets fast-pathed into ops before main loop, but then
    // the retain in 'b' also tries to process it, causing wrong result
    const a = new Delta().delete(2).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    // After compose: delete(2) stays, 'Hel' retained, 'X' inserted, 'lo' retained
    const expected = new Delta().delete(2).insert('HelX').insert('lo');
    expect(a.compose(b)).toEqual(expected);
  });
});