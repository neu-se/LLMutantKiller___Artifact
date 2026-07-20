import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink called twice", () => {
  it("should throw TypeError when a partial sink is called a second time", () => {
    // Create a simple through stream (function with length === 1)
    function mapDouble(read: Function) {
      return function(abort: any, cb: Function) {
        read(abort, function(end: any, data: any) {
          if (end) cb(end);
          else cb(null, data * 2);
        });
      };
    }

    // Create a simple sink
    function collectSink(read: Function) {
      // consume the stream
      read(null, function next(end: any, data: any) {
        if (!end) read(null, next);
      });
    }

    // pull with only through streams returns a partial sink (function with length === 1)
    const partialSink = pull(mapDouble, collectSink);

    // Create a simple source
    function source(abort: any, cb: Function) {
      cb(true); // immediately end
    }

    // First call should work fine
    partialSink(source);

    // Second call should throw TypeError in original code
    // In mutated code (if (false)), the check is skipped and it won't throw
    expect(() => {
      partialSink(source);
    }).toThrow(TypeError);
  });
});