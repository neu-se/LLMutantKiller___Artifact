const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with 4 arguments", () => {
  it("should correctly handle case 4 in the switch statement", (done) => {
    // Create a partial application with exactly 4 arguments
    const partial = pull(
      (read: any) => (abort: any, cb: any) => read(abort, cb),
      (read: any) => (abort: any, cb: any) => read(abort, cb),
      (read: any) => (abort: any, cb: any) => read(abort, cb),
      (read: any) => (abort: any, cb: any) => read(abort, cb)
    );

    // Create a simple source that returns a value
    const source = (abort: any, cb: any) => {
      if (abort) cb(abort);
      else cb(null, 42);
    };

    // Apply the partial to the source
    const result = partial(source);

    // The result should be a function
    expect(typeof result).toBe('function');

    // Call the result function and verify it returns the expected value
    result(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(42);
      done();
    });
  });
});