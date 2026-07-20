import vm from "vm";
import fs from "fs";
import path from "path";

describe("Q setImmediate branch", () => {
  it("uses setImmediate when process.toString() is not empty string", (done) => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );
    
    // Create a context where process.toString() returns "[object process]" (real Node behavior)
    // This bypasses the Node.js branch and hits the setImmediate branch
    const mockProcess = {
      toString: () => "[object process]",  // NOT "" so Node.js branch is skipped
      nextTick: process.nextTick.bind(process),
      domain: null,
      env: {},
      emit: () => {}
    };
    
    let setImmediateCalled = false;
    const mockSetImmediate = (fn: Function) => {
      setImmediateCalled = true;
      setImmediate(fn as any);
    };
    
    const context = vm.createContext({
      process: mockProcess,
      setImmediate: mockSetImmediate,
      setTimeout,
      clearTimeout,
      console,
      exports: {},
      module: { exports: {} }
    });
    
    vm.runInContext(qSource, context);
    const Q = (context as any).module.exports;
    
    Q.resolve(42).then((val: number) => {
      expect(setImmediateCalled).toBe(true);
      expect(val).toBe(42);
      done();
    });
  });
});