import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with initial retain', () => {
  it('should handle initial retain operation correctly', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(3, { bold: true });
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'Hel' }, { insert: 'lo', attributes: { bold: true } }];
    expect(result.ops).toEqual(expectedOps);
  });
});