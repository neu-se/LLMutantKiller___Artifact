import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);

describe("find sink mutation detection", () => {
  it("detects mutation by intercepting drain to see what end value find receives", (done) => {
    // Intercept the drain module to spy on what end value find passes
    const findPath = path.resolve(
      fileURLToPath(import.meta.url),
      "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js"
    );
    const drainPath = path.resolve(
      fileURLToPath(import.meta.url),
      "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"
    );
    
    // Read drain to understand its end callback behavior
    const drainModule = require(drainPath);
    
    // Create a custom drain wrapper to capture end callback argument
    let endCallbackArg: any = undefined;
    const originalDrain = drainModule;
    
    // Patch require cache to intercept drain
    const originalDrainExport = require.cache[drainPath]?.exports;
    
    if (require.cache[drainPath]) {
      require.cache[drainPath]!.exports = function(onData: any, onEnd: any) {
        const wrappedOnEnd = (err: any) => {
          endCallbackArg = err;
          if (onEnd) onEnd(err);
        };
        return originalDrain(onData, wrappedOnEnd);
      };
    }
    
    const find = require(findPath);
    
    // Restore
    if (require.cache[drainPath] && originalDrainExport) {
      require.cache[drainPath]!.exports = originalDrainExport;
    }
    
    // Simple source that ends immediately
    function source(end: any, cb: Function) {
      if (end) { cb(end); return; }
      cb(true); // end immediately
    }
    
    find(
      (x: any) => false,
      (err: any, data: any) => {
        console.log("endCallbackArg was:", endCallbackArg);
        console.log("cb received err:", err);
        // Now we know what drain passes to end callback
        expect(err).toBeNull();
        done();
      }
    )(source);
  });
});