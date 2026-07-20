import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should provide array values on normal reads without abort", (done) => {
    const read = values([10, 20, 30]);
    const received: any[] = [];
    const errors: any[] = [];

    read(null, (err: any, data: any) => {
      errors.push(err);
      received.push(data);

      // In original: err=null, data=10
      // In mutated: abortCb(cb, null, onAbort) => cb(null) => err=null, data=undefined
      expect(errors[0]).toBeNull();
      expect(received[0]).toBe(10);
      done();
    });
  });
});