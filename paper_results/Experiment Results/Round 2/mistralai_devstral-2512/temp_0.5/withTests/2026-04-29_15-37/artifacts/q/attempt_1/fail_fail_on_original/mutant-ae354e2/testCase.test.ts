import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
  it("should produce correct deprecation warning message", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const testFunc = () => "test result";
    const deprecatedFunc = Q.deprecate(testFunc, "oldFunc", "newFunc");

    deprecatedFunc();

    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});