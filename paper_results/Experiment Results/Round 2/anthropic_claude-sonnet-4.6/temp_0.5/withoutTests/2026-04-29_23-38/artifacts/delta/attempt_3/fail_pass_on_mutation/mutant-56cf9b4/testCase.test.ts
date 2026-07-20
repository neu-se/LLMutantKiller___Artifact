import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should not retain when inverting a delete op', () => {
    const base = new Delta().insert('hello');
    const delta = new Delta().delete(5);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([{ insert: 'hello' }]);
  });
});