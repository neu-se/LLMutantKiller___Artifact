import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose inserts followed by retain when other starts with retain and delete', () => {
    // this: insert "AB", insert "CD"  
    // other: retain 2, delete 2
    // With optimization: "AB" moved to ops directly, "CD" deleted → [{insert:"AB"}]
    // Without optimization: same via main loop
    // Need a case that actually differs...
    
    const a = new Delta().insert('Hello').insert(' World');
    const b = new Delta().retain(5).delete(6);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'Hello' }]);
  });
});