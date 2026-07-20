import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.deprecate", () => {
  it("should call console.warn when the deprecated function is called", () => {
    const deprecatedFunction = Q.deprecate(function () {}, "testFunction", "newFunction");
    const warnSpy = jest.spyOn(console, "warn");
    deprecatedFunction();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", expect.any(Error));
    warnSpy.mockRestore();
  });
});