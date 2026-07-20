import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain optimization', () => {
  it('should not optimize when this has non-insert operation and other starts with retain', () => {
    const a = new Delta().insert('A').retain(1).insert('B');
    const b = new Delta().retain(1).insert('X');
    const expected = new Delta().insert('A').insert('X').retain(1).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});