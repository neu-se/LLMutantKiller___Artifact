import { jest } from "@jest/globals";

describe("Q setImmediate bind branch", () => {
  it("calls setImmediate.bind with window when window is defined", (done) => {
    jest.resetModules();

    let bindCalled = false;
    let bindThisArg: any = null;

    const originalSetImmediate = (global as any).setImmediate;
    const fakeWindow = { fake: true };

    const mockSetImmediate: any = function (fn: Function) {
      return originalSetImmediate(fn);
    };
    mockSetImmediate.bind = function (thisArg: any, fn: Function) {
      bindCalled = true;
      bindThisArg = thisArg;
      return function () {
        originalSetImmediate(fn);
      };
    };

    (global as any).setImmediate = mockSetImmediate;
    (global as any).window = fakeWindow;
    const origToString = process.toString;
    process.toString = () => "[object Object]";

    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      process.toString = origToString;
      delete (global as any).window;
      (global as any).setImmediate = originalSetImmediate;
    }

    // Original: setImmediate.bind(window, flush) is called → bindCalled = true
    // Mutated: if(false) skips that branch → bindCalled = false
    expect(bindCalled).toBe(true);
    expect(bindThisArg).toBe(fakeWindow);
    done();
  });
});