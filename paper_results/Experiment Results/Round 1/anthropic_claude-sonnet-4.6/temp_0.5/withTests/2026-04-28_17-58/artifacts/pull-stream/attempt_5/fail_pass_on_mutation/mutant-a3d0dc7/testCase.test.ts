import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should call onAbort only when aborted, not on normal reads", (done) => {
    let onAbortCallCount = 0;
    const onAbort = () => { onAbortCallCount++; };

    const read = values([1, 2, 3], onAbort);

    // Normal read - should get data, onAbort should NOT be called
    read(null, (err: any, data: any) => {
      // In original: normal read returns first element, onAbort never called
      // In mutated: if(true) calls abortCb(cb, null, onAbort), cb gets called with null (end signal)
      //             and onAbort gets called
      expect(onAbortCallCount).toBe(0);
      expect(data).toBe(1);
      done();
    });
  });
});