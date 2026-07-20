import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should correctly optimize when composing with a retain-only delta', () => {
    const delta1 = new Delta().insert('Hello').retain(3);
    const delta2 = new Delta().retain(8);
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'Hello' },
      { retain: 3 }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});