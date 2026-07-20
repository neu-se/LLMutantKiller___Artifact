import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly handle composition with initial retain and subsequent operations', () => {
    const delta1 = new Delta().retain(3);
    const delta2 = new Delta().insert('a').retain(2);
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'a' },
      { retain: 2 }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});