import * as path from "path";

describe("Q browser path error rethrowing", () => {
  it("should propagate errors via setTimeout when running in non-Node environment", (done) => {
    const originalProcess = global.process;
    
    // Make isNodeJS = false by making process.toString() not match
    const fakeProcess = Object.create(originalProcess);
    fakeProcess.toString = () => "[object Object]";
    // @ts-ignore
    global.process = fakeProcess;
    
    jest.resetModules();
    const Q2 = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore process
    global.process = originalProcess;
    
    const testError = new Error("browser-mode error");
    let errorCaught = false;
    
    // In browser mode with original code: setTimeout(function(){ throw e; }, 0)
    // causes uncaughtException. With mutation: setTimeout(function(){}, 0) - silent.
    const handler = (err: Error) => {
      if (err === testError) {
        errorCaught = true;
      }
    };
    
    process.on("uncaughtException", handler);
    
    Q2.nextTick(function() {
      throw testError;
    });
    
    setTimeout(function() {
      process.removeListener("uncaughtException", handler);
      expect(errorCaught).toBe(true);
      done();
    }, 500);
  }, 10000);
});