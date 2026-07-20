import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain optimization', () => {
  it('should handle retain optimization when composing with leading retain and multiple inserts', () => {
    const delta1 = new Delta().insert('Hello').insert('World');
    const delta2 = new Delta().retain(3).insert('X');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'HelXloWorld' }];
    expect(result.ops).toEqual(expectedOps);
  });
});