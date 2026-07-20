import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";
import * as nodeDomain from "domain";

describe("Q in non-node context", () => {
  it("flush continues after throw", done => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");
    
    const d = nodeDomain.create();
    d.on("error", () => {}); // suppress all errors
    
    const context = vm.createContext({
      setImmediate: d.bind(setImmediate.bind(global)),
      setTimeout: d.bind(setTimeout.bind(global)),
      clearTimeout,
      module: { exports: {} },
      exports: {},
      console,
    });
    
    vm.runInContext(qSource, context);
    const QFresh = context.module.exports;
    
    const order: string[] = [];
    
    d.run(() => {
      QFresh.nextTick(() => {
        setTimeout(() => order.push("timeout"), 0);
        throw new Error("boom");
      });
      QFresh.nextTick(() => {
        order.push("task2");
      });
    });
    
    setTimeout(() => {
      expect(order[0]).toBe("task2");
      done();
    }, 300);
  });
});