import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should correctly handle retain with non-number input", () => {
    const delta = new Delta();
    const testObj = { key: "value" };
    delta.retain(testObj);
    expect(delta.ops).toEqual([{ retain: testObj }]);
  });
});