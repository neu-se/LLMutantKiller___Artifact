import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with retain optimization', () => {
  it('should handle retain optimization when composing with leading retain and subsequent insert', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(2).insert('X');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'HeXllo' }];
    expect(result.ops).toEqual(expectedOps);
  });
});