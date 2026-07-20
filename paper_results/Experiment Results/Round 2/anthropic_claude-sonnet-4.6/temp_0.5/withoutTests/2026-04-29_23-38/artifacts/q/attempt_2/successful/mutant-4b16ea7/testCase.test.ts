import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate binding with window", () => {
  it("should call setImmediate with window as this context when window is defined", async () => {
    const fakeWindow = { name: "fakeWindow" };
    (global as any).window = fakeWindow;

    const origProcess = global.process;
    // Make process appear non-Node so setImmediate branch is taken
    (global as any).process = {
      toString: () => "[object Object]",
      env: {},
      domain: null,
    };

    jest.resetModules();

    let capturedThis: any = "not-called";
    const origSetImmediate = (global as any).setImmediate;
    (global as any).setImmediate = function (this: any, ...args: any[]) {
      capturedThis = this;
      return origSetImmediate.apply(origSetImmediate, args);
    };

    const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const d = QModule.defer();
    d.resolve(42);
    const val = await d.promise;

    expect(val).toBe(42);
    // Original: setImmediate.bind(window, flush) → this === fakeWindow
    // Mutated:  function(){ setImmediate(flush) } → this !== fakeWindow
    expect(capturedThis).toBe(fakeWindow);

    (global as any).setImmediate = origSetImmediate;
    (global as any).process = origProcess;
    delete (global as any).window;
  });
});