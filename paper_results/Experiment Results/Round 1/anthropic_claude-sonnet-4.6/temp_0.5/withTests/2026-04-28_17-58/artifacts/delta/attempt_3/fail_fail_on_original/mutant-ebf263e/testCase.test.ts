import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain more than length of text with trailing content', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(10).insert('!');
    const expected = new Delta().insert('Hello').insert('!');
    expect(a.compose(b)).toEqual(expected);
  });
});