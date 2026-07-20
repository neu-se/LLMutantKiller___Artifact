import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op", () => {
  it("should correctly calculate the length of an op with a retain object", () => {
    const op: Op = {
      retain: {},
    };
    expect(Op.length(op)).toBe(1);
  });
});