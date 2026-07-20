import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should handle object retain length with attributes correctly", () => {
    const delta = new Delta();
    delta.retain({ key: "value" }, { bold: true });
    expect(delta.ops).toEqual([{ retain: { key: "value" }, attributes: { bold: true } }]);
  });
});