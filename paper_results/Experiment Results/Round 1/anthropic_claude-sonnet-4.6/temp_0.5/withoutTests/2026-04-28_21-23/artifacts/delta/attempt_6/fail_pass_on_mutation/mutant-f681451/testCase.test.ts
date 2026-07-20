import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform where this deletes and other retains - delete should be dropped', () => {
    // this deletes 1, other retains 1
    // After transform, other's retain should be dropped (content was deleted)
    const a = new Delta().delete(1);
    const b = new Delta().retain(1);
    
    // Apply a to base 'x' -> ''
    // Apply transform(b) to '' -> should be no-op
    const result = a.transform(b);
    expect(result.ops).toEqual([]);
  });
});