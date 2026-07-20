import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should optimize when composing with retain followed by insert', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().insert('abc').retain(2);
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'abc' },
      { retain: 2 }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});