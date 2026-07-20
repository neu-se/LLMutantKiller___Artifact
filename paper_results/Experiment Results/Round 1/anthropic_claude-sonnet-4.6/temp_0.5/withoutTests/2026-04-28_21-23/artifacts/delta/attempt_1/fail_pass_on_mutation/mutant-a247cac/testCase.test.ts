import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should correctly compose when rest of other is just retain', () => {
    // Create a scenario where the optimization path would be triggered
    // This means: other has a retain at the end that covers remaining this ops
    // and the last pushed op equals newOp
    
    const a = new Delta().insert('Hello').insert(' World');
    const b = new Delta().retain(5).retain(6); // just retains
    
    const result = a.compose(b);
    const expected = new Delta().insert('Hello World');
    
    expect(result).toEqual(expected);
  });
});