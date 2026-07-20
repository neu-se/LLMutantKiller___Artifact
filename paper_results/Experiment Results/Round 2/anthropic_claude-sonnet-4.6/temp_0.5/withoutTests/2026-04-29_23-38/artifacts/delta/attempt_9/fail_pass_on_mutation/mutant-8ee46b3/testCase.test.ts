import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform when b has retain followed by retain', () => {
    const a = new Delta().retain(3);
    const b = new Delta().retain(3);
    const aTransformB = a.transform(b, false);
    const bTransformA = b.transform(a, false);
    // Both should give empty (trailing retains are chopped)
    expect(aTransformB.ops).toEqual([]);
    expect(bTransformA.ops).toEqual([]);
  });
});