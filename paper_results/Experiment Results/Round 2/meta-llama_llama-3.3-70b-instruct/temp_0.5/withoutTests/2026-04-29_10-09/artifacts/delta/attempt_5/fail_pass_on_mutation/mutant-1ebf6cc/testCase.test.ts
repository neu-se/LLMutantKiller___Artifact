import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op", () => {
  it("should correctly calculate the length of an op with a retain string", () => {
    const op: Op = {
      retain: "test" as any,
    };
    expect(Op.length(op)).toBe(1);
  });
});