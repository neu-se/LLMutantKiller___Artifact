import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should apply optimization when composing with retain-only delta', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(4);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test' }]);
  });
});