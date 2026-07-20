import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("take mutation test", () => {
  it("should correctly propagate error from terminate callback", (done) => {
    const error = new Error("test error");

    const mockRead = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(error);
      } else {
        cb(true);
      }
    };

    const take = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js");
    const takeStream = take(1);
    const read = takeStream(mockRead);

    read(true, (end: any) => {
      expect(end).toBe(error);
      done();
    });
  });
});