import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q setImmediate branch", () => {
  it("should call setImmediate with window as this context when window is defined", (done) => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const mockWindow: Record<string, any> = {};
    let setImmediateThis: any = undefined;
    let setImmediateCalled = false;

    function mockSetImmediate(this: any, fn: Function, ...args: any[]) {
      if (!setImmediateCalled) {
        setImmediateThis = this;
        setImmediateCalled = true;
      }
      setImmediate(fn as any, ...args);
    }

    const sandbox: Record<string, any> = {
      window: mockWindow,
      setImmediate: mockSetImmediate,
      clearImmediate: clearImmediate,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      process: {
        toString: () => "[object Object]",
        env: {},
      },
      console: console,
    };

    vm.createContext(sandbox);
    vm.runInContext(qSource, sandbox);

    const Q = mockWindow.Q;

    Q.nextTick(() => {
      expect(setImmediateCalled).toBe(true);
      // Original: setImmediate.bind(window, flush) → called with this=window
      // Mutated: function() { setImmediate(flush); } → called with this=global/undefined
      expect(setImmediateThis).toBe(mockWindow);
      done();
    });
  });
});