import * as path from "path";

describe("Q browser path error rethrowing", () => {
  it("should rethrow errors via setTimeout in browser (non-Node) environment", (done) => {
    const originalProcess = global.process;
    
    // Remove process to simulate browser environment, forcing isNodeJS = false
    // @ts-ignore
    global.process = undefined;
    
    jest.resetModules();
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const Q2 = require(qPath);
    
    // Restore process immediately after module load
    global.process = originalProcess;
    
    const caughtErrors: Error[] = [];
    const testError = new Error("test browser error");
    
    process.once("uncaughtException", (err: Error) => {
      caughtErrors.push(err);
    });
    
    Q2.nextTick(function() {
      throw testError;
    });
    
    setTimeout(function() {
      expect(caughtErrors).toContain(testError);
      done();
    }, 300);
  });
});