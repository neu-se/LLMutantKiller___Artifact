import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should handle null firstOther in compose', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta();
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test' }]);
  });
});