import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should correctly handle optimization when composing with retain-only delta', () => {
    const delta1 = new Delta().insert('Hello').retain(3, { bold: true });
    const delta2 = new Delta().retain(8);
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'Hello' },
      { retain: 3, attributes: { bold: true } }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});