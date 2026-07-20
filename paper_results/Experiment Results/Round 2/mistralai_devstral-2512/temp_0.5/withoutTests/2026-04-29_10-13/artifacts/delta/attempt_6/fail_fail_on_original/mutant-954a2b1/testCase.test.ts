import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with null firstOther', () => {
  it('should handle null firstOther with retain type correctly in compose', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(null as any, { bold: true });

    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test' }]);
  });
});