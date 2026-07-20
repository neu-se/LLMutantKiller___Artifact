import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain optimization', () => {
  it('should correctly handle insert operations when first other op is retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABXC');
    const result = a.compose(b);
    expect(result).toEqual(expected);
    // Verify the optimization was applied by checking op count
    expect(result.ops.length).toBe(1);
  });
});