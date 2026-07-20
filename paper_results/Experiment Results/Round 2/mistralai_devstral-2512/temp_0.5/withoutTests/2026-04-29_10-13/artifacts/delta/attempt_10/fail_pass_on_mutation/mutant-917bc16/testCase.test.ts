import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should optimize when composing with retain-only delta and matching last operation', () => {
    const delta1 = new Delta().insert('Hello', { bold: true });
    const delta2 = new Delta().retain(5, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'Hello', attributes: { bold: true } }]);
  });
});