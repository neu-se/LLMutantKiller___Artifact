import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() with object retain", () => {
  it("returns correct length for object retain", () => {
    const op = { retain: { figure: true } };
    expect(Op.length(op)).toBe(1);
  });
});