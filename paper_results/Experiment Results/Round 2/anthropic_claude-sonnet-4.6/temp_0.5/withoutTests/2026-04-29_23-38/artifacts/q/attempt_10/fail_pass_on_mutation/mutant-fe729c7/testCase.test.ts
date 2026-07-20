import * as fs from "fs";
import * as vm from "vm";

describe("array_reduce fallback", () => {
  it("uses first existing index as basis, not index 0 if missing", () => {
    // Extract just the fallback function from Q's source
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf-8");
    
    // Extract the fallback function body
    const match = qSource.match(/Array\.prototype\.reduce \|\| (function \(callback, basis\) \{[\s\S]*?\})\s*\)/);
    if (!match) throw new Error("Could not find array_reduce fallback");
    
    const fallbackSrc = match[1];
    const fallback = vm.runInNewContext(`(${fallbackSrc})`);
    
    // Test with sparse array [,42]
    const sparse: any[] = new Array(2);
    sparse[1] = 42;
    
    // Original: if (index in this) → skips hole → basis = 42
    // Mutated:  if (true) → basis = sparse[0] = undefined
    const result = fallback.call(sparse, (a: any, b: any) => b);
    expect(result).toBe(42);
  });
});