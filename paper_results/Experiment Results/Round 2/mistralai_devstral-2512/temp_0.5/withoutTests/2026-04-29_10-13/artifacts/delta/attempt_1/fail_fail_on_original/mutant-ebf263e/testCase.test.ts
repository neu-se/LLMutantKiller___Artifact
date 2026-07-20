import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain operation", () => {
  it("should correctly compose when first operation is retain with null attributes", () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    const expectedOps = [{ retain: 3 }];
    expect(result.ops).toEqual(expectedOps);
  });
});