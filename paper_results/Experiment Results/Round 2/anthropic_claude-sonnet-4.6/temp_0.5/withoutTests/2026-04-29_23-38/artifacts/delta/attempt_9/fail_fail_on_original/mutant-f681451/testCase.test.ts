import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform: this=delete+retain, other=retain+retain should handle iterator correctly', () => {
    const a = new Delta().delete(1).retain(1);
    const b = new Delta().retain(1).retain(1);
    // If otherIter is advanced for the delete (mutated), 
    // the second retain in other might be misaligned
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 1 }]);
  });
});