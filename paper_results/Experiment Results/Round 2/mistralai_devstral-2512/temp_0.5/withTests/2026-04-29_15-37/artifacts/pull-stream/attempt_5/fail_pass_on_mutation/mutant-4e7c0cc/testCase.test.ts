const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with 4 arguments", () => {
  it("should correctly handle case 4 in the switch statement", (done) => {
    // Create a partial application with 4 arguments
    const partial = pull(
      (read: any) => (abort: any, cb: any) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data * 2);
        });
      },
      (read: any) => (abort: any, cb: any) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data);
        });
      },
      (read: any) => (abort: any, cb: any) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data);
        });
      },
      (read: any) => (abort: any, cb: any) => {
        read(abort, (end: any, data: any) => {
          if (end) cb(end);
          else cb(null, data);
        });
      }
    );

    // Create a simple source
    const source = (abort: any, cb: any) => {
      if (abort) cb(abort);
      else cb(null, 1);
    };

    // Apply the partial to the source
    const result = partial(source);

    // Verify the result is a function (the expected behavior)
    expect(typeof result).toBe('function');

    // Call the result function to verify it works
    result(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(2); // 1 * 2 from the first transform
      done();
    });
  });
});