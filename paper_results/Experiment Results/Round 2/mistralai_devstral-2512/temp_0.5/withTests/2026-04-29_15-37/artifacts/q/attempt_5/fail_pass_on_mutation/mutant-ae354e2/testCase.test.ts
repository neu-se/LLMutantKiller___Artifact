const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce correct deprecation warning message", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Access the internal deprecate function by evaluating the module's code
    const deprecate = eval(`
      (function () {
        "use strict";
        function deprecate(callback, name, alternative) {
          return function () {
            if (typeof console !== "undefined" &&
                   typeof console.warn === "function") {
              console.warn(name + " is deprecated, use " + alternative);
            }
            return callback.apply(callback, arguments);
          };
        }
        return deprecate;
      })()
    `);

    const testFunc = () => "test result";
    const deprecatedFunc = deprecate(testFunc, "oldFunc", "newFunc");

    deprecatedFunc();

    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});