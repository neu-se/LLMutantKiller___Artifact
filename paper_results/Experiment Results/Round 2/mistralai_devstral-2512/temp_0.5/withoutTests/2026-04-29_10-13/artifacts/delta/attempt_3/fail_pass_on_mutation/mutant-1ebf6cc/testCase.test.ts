import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("Op.length() with retain object", () => {
  it("should return 1 when retain is an object", () => {
    const opWithRetainObject = {
      retain: { key: "value" },
      attributes: { bold: true }
    };
    expect(Op.length(opWithRetainObject)).toBe(1);
  });
});