import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should handle object retain operations correctly", () => {
    const op: Op = { retain: { key: "value" } };
    const length = Op.length(op);
    expect(length).toBe(1);
  });
});