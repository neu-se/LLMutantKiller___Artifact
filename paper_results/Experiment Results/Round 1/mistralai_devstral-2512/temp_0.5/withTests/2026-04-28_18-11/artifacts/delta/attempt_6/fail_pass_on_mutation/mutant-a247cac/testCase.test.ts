import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization edge case', () => {
  it('should trigger out-of-bounds error with mutated code', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true });
    const b = new Delta().retain(1).delete(1);
    // This test is designed to expose the array index mutation
    // The mutation changes [delta.ops.length - 1] to [delta.ops.length + 1]
    // which would cause an out-of-bounds access when the optimization condition is met
    expect(() => a.compose(b)).not.toThrow();
  });
});