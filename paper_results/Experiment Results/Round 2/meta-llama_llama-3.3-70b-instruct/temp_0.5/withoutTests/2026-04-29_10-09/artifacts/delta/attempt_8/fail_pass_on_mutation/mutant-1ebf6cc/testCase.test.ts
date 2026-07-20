import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op", () => {
  it("should correctly calculate the length of an op with a retain object", () => {
    const op: Op = {
      retain: "a",
    };
    // The mutation changes the condition to check for typeof op.retain === "", which will be true for an empty string
    // So, the length function will return 1, but we expect it to return the length of the string
    expect(Op.length(op)).toBe(1);
  });
});