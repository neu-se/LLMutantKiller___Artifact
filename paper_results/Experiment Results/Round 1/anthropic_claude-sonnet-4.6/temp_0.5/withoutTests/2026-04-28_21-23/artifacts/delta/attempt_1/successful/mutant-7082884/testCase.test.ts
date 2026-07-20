import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta diff optimization', () => {
  it('should return empty delta when diffing a delta with itself even with non-insert ops', () => {
    const delta = new Delta([{ retain: 5 }]);
    // In original: this.ops === other.ops, returns new Delta() immediately
    // In mutated: if(false) skips optimization, proceeds to diff which throws error for non-insert ops
    expect(() => delta.diff(delta)).not.toThrow();
    const result = delta.diff(delta);
    expect(result.ops).toEqual([]);
  });
});