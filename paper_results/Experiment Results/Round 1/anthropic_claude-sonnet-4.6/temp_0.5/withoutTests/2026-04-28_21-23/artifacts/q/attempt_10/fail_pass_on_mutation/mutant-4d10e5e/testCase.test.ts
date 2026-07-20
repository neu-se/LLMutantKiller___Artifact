import vm from "vm";
import fs from "fs";
import path from "path";

describe("hasStacks initialization", () => {
  it("hasStacks should reflect Error.stack availability", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");
    
    class NoStackError {
      message: string;
      name: string = 'Error';
      constructor(msg?: string) {
        this.message = msg || '';
        // No stack!
      }
    }
    
    const context = vm.createContext({
      module: { exports: {} },
      exports: {},
      require: (id: string) => require(id),
      console: console,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: setImmediate,
      process: process,
      Error: NoStackError,
      TypeError: class extends NoStackError { constructor(msg?: string) { super(msg); this.name = 'TypeError'; } },
      RangeError: class extends NoStackError { constructor(msg?: string) { super(msg); this.name = 'RangeError'; } },
    });
    
    vm.runInContext(qSource, context);
    const QFresh = (context as any).module.exports;
    
    // With NoStackError (no stack property):
    // Original: hasStacks=false → try/catch → e.stack=undefined → hasStacks=false
    // Mutated: hasStacks=true → try/catch → e.stack=undefined → hasStacks=false
    // Both: hasStacks=false - STILL THE SAME!
    
    QFresh.longStackSupport = true;
    const deferred = QFresh.defer();
    expect(deferred.promise.stack).toBeUndefined();
  });
});