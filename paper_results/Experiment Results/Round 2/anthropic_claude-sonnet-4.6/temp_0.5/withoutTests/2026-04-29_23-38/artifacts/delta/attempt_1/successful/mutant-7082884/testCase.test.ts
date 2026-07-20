import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta diff with same reference', () => {
  it('should return empty delta when diffing a delta with itself even with non-document ops', () => {
    const delta = new Delta().insert('hello').retain(5);
    // In original code: this.ops === other.ops triggers early return of new Delta()
    // In mutated code: if(false) never triggers, proceeds to map() which throws
    // because retain ops are not allowed in diff()
    expect(() => {
      const result = delta.diff(delta);
      expect(result.ops).toEqual([]);
    }).not.toThrow();
  });
});