import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('insert priority with delete interaction', () => {
    const a = new Delta().insert('A').delete(1);
    const b = new Delta().insert('B').delete(1);
    const expected = new Delta().retain(1).insert('B').delete(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});