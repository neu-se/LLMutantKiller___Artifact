import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q getFileNameAndLineNumber attempt2", () => {
  it("should correctly identify and filter internal Q frames in long stack traces", async () => {
    Q.longStackSupport = true;
    
    async function outerFunction() {
      return Q.reject(new Error("test"));
    }
    
    const err = await outerFunction().then(null, (e: Error) => e);
    const stack = err.stack || "";
    
    // With original code: Q internal frames filtered, stack is shorter/cleaner
    // With mutated code: qFileName is undefined, isInternalFrame always returns false,
    // so Q internal frames remain in the stack
    // We check that "q.js" internal implementation details don't appear
    const lines = stack.split("\n");
    const internalQLines = lines.filter((l: string) => 
      /q\.js:\d+/.test(l) && (l.includes("promiseDispatch") || l.includes("runSingle") || l.includes("flush"))
    );
    
    expect(internalQLines.length).toBe(0);
  });
});