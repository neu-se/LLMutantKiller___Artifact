import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should correctly optimize when first other op is retain and this has insert', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(1).insert('X');
    const expected = new Delta().insert('AXBC');
    expect(a.compose(b)).toEqual(expected);
  });
});