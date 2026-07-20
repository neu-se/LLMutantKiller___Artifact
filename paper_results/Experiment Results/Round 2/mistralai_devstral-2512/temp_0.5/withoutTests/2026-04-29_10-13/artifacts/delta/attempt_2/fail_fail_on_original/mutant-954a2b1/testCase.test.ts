import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with retain operation', () => {
  it('should correctly handle null firstOther with retain type in compose', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(5);

    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: 5 }];
    expect(result.ops).toEqual(expectedOps);
  });
});