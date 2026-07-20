const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe("take mutation test", () => {
  it("should propagate error from terminate callback", (done) => {
    const error = new Error("test error");
    let terminateCalled = false;

    const source = function (abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        terminateCalled = true;
        cb(error);
      } else {
        cb(null, 1);
      }
    };

    const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");
    const read = pull(source, take(1), pull.collect((err: any) => {
      if (err === true) {
        done(new Error("Expected error to propagate, but got true"));
      } else if (err === error) {
        if (!terminateCalled) {
          done(new Error("Terminate was not called with error"));
        } else {
          done();
        }
      } else {
        done(new Error(`Unexpected error: ${err}`));
      }
    }));

    read(null, () => {});
    read(true, () => {});
  });
});