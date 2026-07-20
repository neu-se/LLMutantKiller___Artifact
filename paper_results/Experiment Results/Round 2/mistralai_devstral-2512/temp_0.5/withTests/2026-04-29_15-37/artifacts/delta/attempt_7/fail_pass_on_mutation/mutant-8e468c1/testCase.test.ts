import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() insert optimization', () => {
  it('should apply optimization when this has insert and other starts with retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABXC');
    const result = a.compose(b);
    expect(result).toEqual(expected);
    // Additional check to ensure optimization was applied
    expect(result.ops.length).toBe(1);
  });
});