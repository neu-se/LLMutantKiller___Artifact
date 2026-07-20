const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async generator with explicit StopIteration", () => {
  it("should handle generator with StopIteration exception", (done) => {
    // Create a generator that throws StopIteration
    const generator = Q.async(function* () {
      yield 1;
      // This will test the StopIteration handling path
      throw new (typeof StopIteration !== "undefined" ? StopIteration : Error)("test");
      return "unreachable";
    });

    generator().then((result: string) => {
      // In original code, this path should be taken
      expect(result).toBe("test");
      done();
    }).catch((error: Error) => {
      // In mutated code, this path might be taken instead
      done(error);
    });
  });
});