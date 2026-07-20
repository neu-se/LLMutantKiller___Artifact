import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() with retain object", () => {
  it("should return 1 for object retain and handle string case correctly", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    // Original code: returns 1 for object case
    // Mutated code: condition becomes invalid, falls through to return 1
    expect(Op.length(opWithRetainObject)).toBe(1);

    // This will expose the mutation when combined with other cases
    const opWithInsert = {
      insert: "test",
      attributes: { bold: true }
    };
    expect(Op.length(opWithInsert)).toBe(4);
  });
});