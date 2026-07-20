import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 when retain is an empty object", () => {
    const op = { retain: {} };
    expect(Op.length(op)).toBe(1);
  });
});