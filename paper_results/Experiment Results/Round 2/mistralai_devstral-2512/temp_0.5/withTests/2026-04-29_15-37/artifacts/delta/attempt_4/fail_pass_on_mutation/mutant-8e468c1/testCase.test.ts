import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() insert optimization', () => {
  it('should optimize when first other op is retain and this has insert', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(1).insert('X').insert('Y');
    const expected = new Delta().insert('AXYBC');
    expect(a.compose(b)).toEqual(expected);
  });
});