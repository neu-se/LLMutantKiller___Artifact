import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization handles the case where other retain equals insert length exactly', () => {
    const a = new Delta().insert('AB').delete(2);
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta().insert('A').delete(3);
    expect(a.compose(b)).toEqual(expected);
  });
});