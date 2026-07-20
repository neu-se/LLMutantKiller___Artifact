import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain optimization', () => {
  it('should handle mixed operations correctly when first other op is retain', () => {
    const a = new Delta().insert('A').delete(1).insert('B');
    const b = new Delta().retain(1).insert('X');
    const expected = new Delta().insert('AXB').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});