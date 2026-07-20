import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should return 1 for object retain with non-null value", () => {
    const op = { retain: { length: 5 } };
    expect(Op.length(op)).toBe(1);
  });
});