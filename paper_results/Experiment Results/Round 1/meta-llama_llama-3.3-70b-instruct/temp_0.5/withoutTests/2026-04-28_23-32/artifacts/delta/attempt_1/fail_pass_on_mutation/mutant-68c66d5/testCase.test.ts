import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should export Delta as both a named export and the default export", () => {
    expect(Delta).toBeInstanceOf(Function);
    const deltaInstance = new Delta();
    expect(deltaInstance).toBeInstanceOf(Delta);
    expect(deltaInstance.constructor.name).toBe("Delta");
  });
});