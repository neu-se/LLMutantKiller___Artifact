import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should handle null retain value correctly", () => {
    const op = { retain: null };
    expect(Op.length(op)).toBe(1);
  });
});