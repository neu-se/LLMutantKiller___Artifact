import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should be exported as a module when run in a CommonJS environment", () => {
    const originalModule = globalThis.module;
    globalThis.module = { exports: {} };
    require../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
    expect(globalThis.module.exports.default).toBeInstanceOf(Function);
    globalThis.module = originalModule;
  });
});