const flatten = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js");

describe("flatten mutation test", () => {
  it("should handle abort with error correctly", (done) => {
    const error = new Error("test error");
    const readCalls: any[] = [];

    const mockRead = (abort: any, cb: (err: any, data?: any) => void) => {
      readCalls.push({ abort, cb });
      if (abort) {
        cb(null);
      } else {
        cb(true);
      }
    };

    const flattenStream = flatten()(mockRead);

    flattenStream(error, (err: any) => {
      expect(readCalls.length).toBe(1);
      expect(readCalls[0].abort).toBe(error);
      done();
    });
  });
});