import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() retain start optimization', () => {
  it('retain start optimization only copies insert ops not retain ops', () => {
    const a = new Delta().retain(3).insert('X');
    const b = new Delta().retain(3).insert('Y');
    const expected = new Delta().retain(3).insert('Y').insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});