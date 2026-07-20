import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should handle initial retain operation with attributes correctly', () => {
    const delta1 = new Delta().retain(3, { bold: true });
    const delta2 = new Delta().insert('test');
    const result = delta1.compose(delta2);
    const expectedOps = [
      { retain: 3, attributes: { bold: true } },
      { insert: 'test' }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});