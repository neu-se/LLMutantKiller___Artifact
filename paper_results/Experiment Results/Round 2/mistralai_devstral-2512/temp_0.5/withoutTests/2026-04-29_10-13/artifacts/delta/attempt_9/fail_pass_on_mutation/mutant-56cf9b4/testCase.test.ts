import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should not create inverted operations for retain without attributes', () => {
    const base = new Delta().insert('Hello World');
    const delta = new Delta().retain(5);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([]);
  });
});