import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should not invert retain operations without attributes', () => {
    const base = new Delta().insert('test');
    const delta = new Delta().retain(2);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([{ retain: 2 }]);
  });
});