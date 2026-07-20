import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should apply optimization when composing with retain-only delta and identical last operation', () => {
    const delta1 = new Delta().insert('test', { bold: true });
    const delta2 = new Delta().retain(4, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test', attributes: { bold: true } }]);
  });
});