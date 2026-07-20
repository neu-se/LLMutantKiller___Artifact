import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('insert then retain-embed composed with delete-all should produce empty', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    // Insert 'a', then retain embed
    const a = new Delta().insert('a').retain({ image: 'test' });
    // Delete 'a' (1 char), then delete embed (1 char)  
    const b = new Delta().delete(1).delete(1);
    const result = a.compose(b);
    
    Delta.unregisterEmbed('image');
    
    // insert 'a' + delete 'a' cancels
    // retain embed + delete = delete
    // But delete + delete merges to delete(2) in b
    // So: insert(a) + delete(2) → first char cancels, second char...
    // thisOp=insert('a'), otherOp=delete(1) → cancel
    // thisOp=retain({image}), otherOp=delete(1) → push delete
    expect(result.ops).toEqual([{ delete: 1 }]);
  });
});