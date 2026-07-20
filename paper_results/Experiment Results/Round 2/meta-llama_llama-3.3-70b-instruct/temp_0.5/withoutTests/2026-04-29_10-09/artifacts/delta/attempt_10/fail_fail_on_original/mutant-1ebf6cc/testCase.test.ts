import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op", () => {
  it("should correctly calculate the length of an op with a retain object", () => {
    const op: Op = {
      retain: {},
    };
    // The mutation changes the condition to check for typeof op.retain === "", which will be false for an object
    // So, the length function will return 1, which is correct for the original code
    // But for the mutated code, it should also return 1 because typeof {} === "object" and not ""
    // However, if we use a string that is not empty, the original code will return the length of the string
    // And the mutated code will return 1 because typeof "string" === "string" and not ""
    const op2: Op = {
      retain: "test",
    };
    expect(Op.length(op2)).toBe(4);
  });
});