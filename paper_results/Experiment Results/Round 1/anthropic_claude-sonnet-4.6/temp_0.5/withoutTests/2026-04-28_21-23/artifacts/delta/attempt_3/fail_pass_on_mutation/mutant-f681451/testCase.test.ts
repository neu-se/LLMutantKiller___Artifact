import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('should skip other retain when this deletes', () => {
    // When 'this' deletes and 'other' retains the same content,
    // the transform should produce an empty delta (the retain is dropped)
    // because the content no longer exists after this delete.
    // Original: 'continue' skips pushing anything for this iteration
    // Mutated: no 'continue', falls through - but since it's in if(thisOp.delete){} 
    // the else branches are skipped too... let me think differently
    
    // Actually test: this=delete(1)+insert('a'), other=delete(1)
    // After transform, other's delete should be empty since this already deleted
    const a = new Delta().delete(1).insert('a');
    const b = new Delta().delete(1);
    const result = a.transform(b);
    expect(result.ops).toEqual([]);
  });
});