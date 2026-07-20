import { createRequire } from "module";
import { fileURLToPath } from "url";
import * as path from "path";

describe("Q environment detection", () => {
  it("should fall back to setImmediate when process.toString() does not return '[object process]'", (done) => {
    // Save original toString
    const originalToString = process.toString.bind(process);
    const originalProcessToString = Object.getPrototypeOf(process).toString;

    // Mock process.toString to return something other than "[object process]"
    Object.getPrototypeOf(process).toString = function() {
      return "[object Object]";
    };

    // Clear require cache and reload Q
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const order: string[] = [];

    // Schedule via setImmediate - if Q uses setImmediate, Q.nextTick callback
    // and this setImmediate callback ordering tells us which path was taken
    const immediateHandle = setImmediate(() => {
      order.push("setImmediate-before");
    });

    Q.nextTick(() => {
      order.push("Q.nextTick");
    });

    // Restore toString
    Object.getPrototypeOf(process).toString = originalProcessToString;

    // Wait enough time for everything to settle
    setImmediate(() => {
      setImmediate(() => {
        // In original code: process.toString() === "[object Object]" !== "[object process]"
        // so it uses setImmediate for requestTick
        // Q.nextTick callback runs in same setImmediate batch or after
        // In mutated code: condition is `true`, so it uses process.nextTick
        // process.nextTick runs BEFORE setImmediate, so Q.nextTick runs before setImmediate-before
        
        // Original: Q uses setImmediate -> order could be ["setImmediate-before", "Q.nextTick"] or interleaved
        // Mutated: Q uses process.nextTick -> order is ["Q.nextTick", "setImmediate-before"]
        
        expect(order[0]).toBe("setImmediate-before");
        
        // Restore cache
        delete require.cache[qPath];
        done();
      });
    });
  });
});