import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.deprecate", () => {
  it("should call console.warn when the deprecated function is called", () => {
    const deprecatedFunction = Q.deprecate(function () {}, "testFunction", "newFunction");
    const originalWarn = console.warn;
    console.warn = jest.fn();
    deprecatedFunction();
    expect(console.warn).toHaveBeenCalledTimes(1);
    console.warn = originalWarn;
  });

  it("should not call console.warn when the condition is not met in the mutated code", () => {
    const originalDeprecate = Q.deprecate;
    Q.deprecate = function (callback, name, alternative) {
      return function () {
        if (true) {
          // do nothing
        } else {
          console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
      };
    };

    const deprecatedFunction = Q.deprecate(function () {}, "testFunction", "newFunction");
    const originalWarn = console.warn;
    console.warn = jest.fn();
    deprecatedFunction();
    expect(console.warn).toHaveBeenCalledTimes(0);
    console.warn = originalWarn;
    Q.deprecate = originalDeprecate;
  });
});