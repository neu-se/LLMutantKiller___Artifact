import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.deprecate", () => {
  it("should call console.warn when the deprecated function is called", () => {
    const originalWarn = console.warn;
    console.warn = jest.fn();
    const deprecatedFunction = Q.deprecate(function () {}, "testFunction", "newFunction");
    deprecatedFunction();
    expect(console.warn).toHaveBeenCalledTimes(1);
    console.warn = originalWarn;
  });
});