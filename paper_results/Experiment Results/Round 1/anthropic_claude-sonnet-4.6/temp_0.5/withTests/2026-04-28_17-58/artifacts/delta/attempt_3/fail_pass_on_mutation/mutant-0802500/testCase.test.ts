import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retains end optimization interaction with retain start optimization', () => {
    const a = new Delta().insert('X').insert('Y');
    const b = new Delta().retain(1).insert('Z');
    const expected = new Delta().insert('X').insert('Z').insert('Y');
    expect(a.compose(b)).toEqual(expected);
  });
});