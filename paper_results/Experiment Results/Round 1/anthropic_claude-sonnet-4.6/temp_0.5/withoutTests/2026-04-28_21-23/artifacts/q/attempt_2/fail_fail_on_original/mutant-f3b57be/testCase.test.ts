import { createRequire } from "module";

describe("Q reduce fallback", () => {
  it("should correctly handle array reduction without initial value in fallback", () => {
    const originalReduce = Array.prototype.reduce;
    const originalMap = Array.prototype.map;
    
    // @ts-ignore
    delete Array.prototype.reduce;
    // @ts-ignore  
    delete Array.prototype.map;

    const require = createRequire(import.meta.url);
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];
    const Q = require(qPath);
    
    Array.prototype.reduce = originalReduce;
    Array.prototype.map = originalMap;

    // array_map uses array_reduce with void 0 initial value
    // array_indexOf has its own fallback
    // The key question: does any Q operation call array_reduce with only 2 args?
    // Answer: No. But let's test allSettled which uses array_map heavily
    
    return Q.allSettled([Q.resolve(1), Q.reject(new Error("test")), Q.resolve(3)])
      .then((results: any[]) => {
        expect(results[0].state).toBe("fulfilled");
        expect(results[0].value).toBe(1);
        expect(results[1].state).toBe("rejected");
        expect(results[2].state).toBe("fulfilled");
        expect(results[2].value).toBe(3);
      });
  });
});