import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('diff() same object optimization', () => {
  it('should return empty delta when diffing a delta with itself, even with non-document ops', () => {
    const a = new Delta().insert('Hello').retain(5);
    // This would throw "diff() called with non-document" without the optimization
    // because retain ops are not inserts
    expect(() => a.diff(a)).not.toThrow();
    expect(a.diff(a)).toEqual(new Delta());
  });
});