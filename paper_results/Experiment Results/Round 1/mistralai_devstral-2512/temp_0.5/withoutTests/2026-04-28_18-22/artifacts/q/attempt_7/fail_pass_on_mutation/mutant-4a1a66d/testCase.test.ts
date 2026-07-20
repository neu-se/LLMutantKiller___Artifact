const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async generator StopIteration behavior", () => {
  it("should handle generator completion correctly based on StopIteration check", (done) => {
    // Create a generator that will test the StopIteration path
    const generator = Q.async(function* () {
      yield 1;
      // This return should trigger different behavior based on
      // whether StopIteration is defined or not
      return "completed";
    });

    generator().then((result: string) => {
      // The mutation changes the condition from checking StopIteration
      // to always being true, which should affect the behavior
      expect(result).toBe("completed");
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});