import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('alternating edits with delete and retain', () => {
    const a = new Delta().retain(2).insert('si').delete(5);
    const b = new Delta().retain(1).insert('e').delete(5).retain(1).insert('ow');
    const expected = new Delta().retain(1).insert('e').delete(1).retain(2).insert('ow');
    expect(a.transform(b, false)).toEqual(expected);
  });
});