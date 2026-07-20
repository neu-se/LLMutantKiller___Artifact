import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization for leading retain', () => {
  it('should correctly compose when this starts with inserts and other starts with a retain covering those inserts', () => {
    // this delta: insert "Hello" (length 5), then retain 3
    // other delta: retain 8 (covers all 8 characters)
    // Expected result: insert "Hello", retain 3 (the inserts are preserved, retain is chopped)
    const delta1 = new Delta().insert('Hello').retain(3);
    const delta2 = new Delta().retain(8);
    
    const result = delta1.compose(delta2);
    
    // The composed result should preserve the inserts from delta1
    // and the retain from delta1 (since delta2 retains everything)
    expect(result.ops).toEqual([{ insert: 'Hello' }, { retain: 3 }]);
  });
});