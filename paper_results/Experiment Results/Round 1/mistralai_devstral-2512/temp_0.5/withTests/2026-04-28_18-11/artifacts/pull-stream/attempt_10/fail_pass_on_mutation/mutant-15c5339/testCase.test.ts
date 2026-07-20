const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");

describe("take mutation test", () => {
  it("should propagate error from terminate callback", (done) => {
    const error = new Error("test error");
    let terminateCalled = false;

    // Create a mock read function that will be called by take
    const mockRead = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        terminateCalled = true;
        cb(error);
      } else {
        cb(null, 1);
      }
    };

    // Create the take stream
    const takeStream = take(1);

    // Get the through stream function
    const through = takeStream(mockRead);

    // First call to read data
    through(null, (end: any, data: any) => {
      if (end) {
        done(new Error("Stream ended unexpectedly"));
        return;
      }

      // Second call to abort with error
      through(true, (end: any) => {
        if (end === true) {
          done(new Error("Expected error to propagate, but got true"));
        } else if (end === error) {
          if (!terminateCalled) {
            done(new Error("Terminate was not called with error"));
          } else {
            done();
          }
        } else {
          done(new Error(`Unexpected error: ${end}`));
        }
      });
    });
  });
});