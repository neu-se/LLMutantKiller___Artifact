import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should be exported as a module when run in a CommonJS environment", () => {
    const originalModule = globalThis.module;
    globalThis.module = { exports: {} };
    const deltaModule = require('./Delta.ts');
    expect(deltaModule).toBeDefined();
    expect(deltaModule.default).toBeDefined();
    expect(deltaModule.default).toBeInstanceOf(Function);
    globalThis.module = originalModule;
  });
});