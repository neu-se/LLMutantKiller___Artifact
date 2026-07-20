import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with retain optimization', () => {
  it('should handle retain optimization when composing with leading retain', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(5).insert(' World');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'Hello World' }];
    expect(result.ops).toEqual(expectedOps);
  });
});