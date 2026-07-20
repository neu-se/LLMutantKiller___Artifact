import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 for object retain operations", () => {
    const op: Op = { retain: { key: "value" } };
    expect(Op.length(op)).toBe(1);
  });
});