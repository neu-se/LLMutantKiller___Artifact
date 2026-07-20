import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("guards process.emit call with && ensuring it is a function", (done) => {
    const originalEmit = process.emit;
    let typeErrorCaught = false;

    const errHandler = (err: Error) => {
      if (err instanceof TypeError && err.message.includes("emit")) {
        typeErrorCaught = true;
        // Prevent Jest from seeing this error on mutated code
        // by... we can't prevent it
      }
    };

    process.once("unhandledRejection", () => {
      (process as any).emit = null;
      
      process.prependListener("uncaughtException", errHandler);
      
      Q.reject(new Error("second")).then(null, () => {});
      
      setTimeout(() => {
        process.removeListener("uncaughtException", errHandler);
        (process as any).emit = originalEmit;
        expect(typeErrorCaught).toBe(false);
        done();
      }, 300);
    });

    Q.reject(new Error("first"));
  });
});