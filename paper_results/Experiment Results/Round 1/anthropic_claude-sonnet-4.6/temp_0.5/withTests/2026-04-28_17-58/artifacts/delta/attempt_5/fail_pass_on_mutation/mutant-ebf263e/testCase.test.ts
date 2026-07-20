import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain exactly covers leading inserts then insert follows', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(5).insert('!');
    const expected = new Delta().insert('Hello!');
    expect(a.compose(b)).toEqual(expected);
  });
});