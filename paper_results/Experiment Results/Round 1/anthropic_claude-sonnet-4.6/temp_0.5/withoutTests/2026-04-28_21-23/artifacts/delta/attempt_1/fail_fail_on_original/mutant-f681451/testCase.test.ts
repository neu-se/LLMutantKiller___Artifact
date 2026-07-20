import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform - delete vs delete behavior', () => {
  it('should make other delete redundant when this also deletes the same content', () => {
    // When 'this' delta deletes content and 'other' delta also deletes the same content,
    // transforming 'other' against 'this' should result in an empty delta (no-op)
    // because the content 'other' wants to delete has already been deleted by 'this'
    const thisOp = new Delta().delete(3);
    const otherOp = new Delta().delete(3);
    
    const result = thisOp.transform(otherOp);
    
    // The original code uses 'continue' when thisOp.delete is true,
    // so the other's delete should be skipped (redundant)
    expect(result.ops).toEqual([]);
  });
});