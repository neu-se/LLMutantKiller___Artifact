import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should optimize when composing with retain-only delta and matching last operation', () => {
    const delta1 = new Delta().insert('test', { color: 'red' });
    const delta2 = new Delta().retain(4, { color: 'red' });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: 'test', attributes: { color: 'red' } }]);
  });
});