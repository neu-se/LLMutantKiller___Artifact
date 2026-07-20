import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("should read from source exactly once when op immediately returns false", (done) => {
    let readCount = 0;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      readCount++;
      cb(null, readCount);
    }

    const doneCallback = jest.fn((err: any) => {
      // Original: readCount should be 1 (op returned false after first read, then read(true, done) aborts)
      // Mutated: read(undefined, done) causes another read, so done is called with (null, 2) - readCount=2
      expect(readCount).toBe(1);
      done();
    });

    const sink = drain(
      function op(data: any) {
        return false; // always stop immediately
      },
      doneCallback
    );

    sink(source);
  });
});