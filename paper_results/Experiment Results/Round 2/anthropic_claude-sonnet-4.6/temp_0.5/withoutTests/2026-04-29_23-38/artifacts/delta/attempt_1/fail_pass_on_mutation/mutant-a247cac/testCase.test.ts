import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should correctly compose when other ends with plain retains after operations', () => {
    // Create a scenario where the optimization path matters
    // this: insert "hello world"
    // other: delete 5, retain 6 (the retain at end triggers optimization check)
    const a = new Delta().insert('hello world');
    const b = new Delta().delete(5).retain(6);
    
    const composed = a.compose(b);
    
    // Expected: insert " world" (deleted "hello", kept " world")
    const expected = new Delta().insert(' world');
    
    expect(composed.ops).toEqual(expected.ops);
  });
});