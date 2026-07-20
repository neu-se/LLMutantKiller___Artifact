import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta insert method", () => {
  it("should handle empty string with attributes by not creating an operation", () => {
    const delta = new Delta();
    delta.insert("", { bold: true });
    expect(delta.ops.length).toBe(0);
  });
});