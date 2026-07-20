import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() with object retain", () => {
  it("returns 1 for object retain", () => {
    const op = { retain: { figure: true } };
    expect(Op.length(op)).toEqual(1);
  });
});