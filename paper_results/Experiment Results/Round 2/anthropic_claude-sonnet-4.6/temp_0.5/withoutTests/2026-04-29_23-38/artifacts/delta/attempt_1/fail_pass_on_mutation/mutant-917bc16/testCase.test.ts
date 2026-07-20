import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose optimization', () => {
  it('should correctly compose when other delta is shorter than this delta', () => {
    // Create a delta with multiple retain ops
    // other delta only covers part of this delta
    // The optimization triggers when otherIter is exhausted and last op matches
    const a = new Delta().insert('Hello World');
    const b = new Delta().retain(5).insert('!');
    
    const composed = a.compose(b);
    const expected = new Delta().insert('Hello!').insert(' World');
    
    // The result should be Hello! World
    expect(composed.ops).toEqual(new Delta().insert('Hello! World').ops);
  });
});