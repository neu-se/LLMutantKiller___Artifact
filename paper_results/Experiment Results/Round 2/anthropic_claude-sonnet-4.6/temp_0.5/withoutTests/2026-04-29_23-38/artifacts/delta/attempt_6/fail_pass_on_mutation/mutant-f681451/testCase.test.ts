import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform: this deletes multiple chars, other retains same chars', () => {
    // this: delete(3)
    // other: retain(1), retain(1), retain(1) (effectively retain(3))
    // After transform: should be empty (all retains dropped by delete)
    const a = new Delta().delete(3);
    const b = new Delta().retain(3);
    const result = a.transform(b, false);
    expect(result.ops).toEqual([]);
  });
});