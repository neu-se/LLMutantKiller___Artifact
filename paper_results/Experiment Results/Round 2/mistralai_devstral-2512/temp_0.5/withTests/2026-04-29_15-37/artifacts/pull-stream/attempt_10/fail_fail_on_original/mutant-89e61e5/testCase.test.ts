import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("partial sink should throw when called twice", () => {
  it("should throw TypeError when partial sink is called twice", (done) => {
    // Create a partial sink by passing a function with exactly 1 argument
    // This triggers the partial application logic in pull.js
    const partialSink = pull(function(read: any) {
      return function(end: any, cb: any) {
        read(end, cb);
      };
    });

    // Create a simple source
    const source = function(end: any, cb: any) {
      if (end) {
        cb(end);
      } else {
        cb(null, 1);
      }
    };

    // Apply the partial sink to the source
    const read = partialSink(source);

    // First call should work
    read(null, function(end: any, data: any) {
      expect(data).toBe(1);

      // Second call should trigger the error in original code
      // but do nothing in mutated code
      let errorThrown = false;
      try {
        read(null, function(end: any, data: any) {});
      } catch (err: any) {
        errorThrown = true;
        expect(err).toBeInstanceOf(TypeError);
        expect(err.message).toBe("partial sink should only be called once!");
      }

      // This assertion will pass in original code (error thrown)
      // but fail in mutated code (no error)
      expect(errorThrown).toBe(true);
      done();
    });
  });
});