import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain operation", () => {
  it("should correctly handle retain operations with null attributes at the start", () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ retain: 3 }]);
  });
});