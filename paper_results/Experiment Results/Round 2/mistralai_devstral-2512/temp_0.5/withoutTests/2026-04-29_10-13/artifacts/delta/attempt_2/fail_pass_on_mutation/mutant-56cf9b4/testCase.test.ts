import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should not invert retain operations without attributes', () => {
    const base = new Delta().insert('Hello World');
    const delta = new Delta().retain(5);
    const inverted = delta.invert(base);
    const expected = new Delta();
    expect(inverted.ops).toEqual(expected.ops);
  });
});