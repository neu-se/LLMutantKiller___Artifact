const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async generator with StopIteration mutation detection", () => {
  it("should expose the mutation by testing generator behavior with StopIteration", (done) => {
    // Create a generator that will test the StopIteration handling path
    // The mutation changes the condition from checking StopIteration to always true
    const generator = Q.async(function* () {
      yield 1;
      // This will test the StopIteration handling path
      if (typeof StopIteration !== "undefined") {
        throw new StopIteration("test");
      }
      return "unreachable";
    });

    generator().then((result: string) => {
      // In original code, this should be reached
      expect(result).toBe("test");
      done();
    }).catch((error: Error) => {
      // In mutated code, this might be reached instead
      done(error);
    });
  });
});