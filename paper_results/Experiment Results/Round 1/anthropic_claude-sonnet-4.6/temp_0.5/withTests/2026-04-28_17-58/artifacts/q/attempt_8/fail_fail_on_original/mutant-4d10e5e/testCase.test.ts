import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks initialization", () => {
  it("should have hasStacks as false so that long stack traces include unfiltered q.js frames", () => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    // promise.stack is the RAW stack captured inside defer() - contains q.js frames
    const rawStack = (d.promise as any).stack as string;
    
    d.reject(new Error("test"));
    
    return d.promise.then(null, function(err: Error) {
      Q.longStackSupport = false;
      const filteredStack = err.stack || "";
      
      // rawStack contains q.js frames (captured inside defer())
      // filteredStack has gone through filterStackString
      // If qStartingLine is UNDEFINED (original: hasStacks=false when captureLine runs for qStartingLine)
      //   -> isInternalFrame always false -> q.js frames NOT filtered -> filteredStack contains q.js
      // If qStartingLine is DEFINED (mutated: hasStacks=true when captureLine runs)  
      //   -> isInternalFrame can be true -> q.js frames filtered -> filteredStack lacks q.js
      //
      // But captureLine() for qStartingLine runs AFTER try-catch in both versions...
      // Unless I'm wrong about the code order.
      
      // Let me just check: does rawStack contain q.js?
      expect(rawStack).toContain("q.js");
      // Does filteredStack contain q.js? 
      // If original has qStartingLine=undefined, YES. If mutated has it defined, NO.
      expect(filteredStack).toContain("q.js");
    });
  });
});