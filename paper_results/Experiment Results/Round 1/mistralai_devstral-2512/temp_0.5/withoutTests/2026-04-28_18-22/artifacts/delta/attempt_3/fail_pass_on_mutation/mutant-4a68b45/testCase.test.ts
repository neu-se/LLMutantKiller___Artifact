import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 when retain is an object (not null)", () => {
    const op = { retain: { some: "value" } };
    expect(Op.length(op)).toBe(1);
  });
});