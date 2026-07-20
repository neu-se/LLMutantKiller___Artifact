describe("Q setImmediate window branch", () => {
  it("uses setImmediate correctly when window is defined", () => {
    jest.resetModules();
    
    const originalToString = process.toString.bind(process);
    // Make process.toString not return "[object process]" to force setImmediate branch
    process.toString = () => "[object Object]";
    (global as any).window = { name: "fakeWindow" };
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      process.toString = originalToString;
      delete (global as any).window;
    }
    
    return Q.fcall(() => 42).then((val: number) => {
      expect(val).toBe(42);
    });
  });
});