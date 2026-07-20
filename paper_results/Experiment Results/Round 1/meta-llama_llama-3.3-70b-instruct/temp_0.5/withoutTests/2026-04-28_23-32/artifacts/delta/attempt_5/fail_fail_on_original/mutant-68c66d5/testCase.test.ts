import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should export Delta as both a named export and the default export when run in a CommonJS environment", () => {
    const originalModule = globalThis.module;
    globalThis.module = { exports: {} };
    const deltaModule = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    expect(deltaModule).toBeDefined();
    expect(deltaModule.default).toBeDefined();
    expect(deltaModule.Delta).toBeDefined();
    expect(deltaModule.Delta).toBe(deltaModule.default);
    globalThis.module = originalModule;
  });
});