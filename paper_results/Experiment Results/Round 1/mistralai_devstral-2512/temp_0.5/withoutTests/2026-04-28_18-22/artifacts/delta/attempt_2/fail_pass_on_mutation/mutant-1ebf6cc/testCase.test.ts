import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("Op.length", () => {
  it("should handle object retain operations correctly", () => {
    const opWithObjectRetain: Op = { retain: { someKey: "someValue" } };
    const opWithStringRetain: Op = { retain: "notANumber" as any };
    expect(Op.length(opWithObjectRetain)).toBe(1);
    expect(Op.length(opWithStringRetain)).toBe(1);
  });
});