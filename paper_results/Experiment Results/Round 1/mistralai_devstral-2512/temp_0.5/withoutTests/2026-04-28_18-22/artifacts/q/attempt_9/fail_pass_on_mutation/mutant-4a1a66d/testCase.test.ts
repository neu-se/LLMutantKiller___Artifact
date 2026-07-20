const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async generator behavior with mutation detection", () => {
  it("should detect the StopIteration mutation by testing generator completion", (done) => {
    // This test targets the specific mutation where the condition
    // was changed from checking StopIteration to always being true
    const generator = Q.async(function* () {
      yield 1;
      yield 2;
      return "final";
    });

    generator().then((result: string) => {
      // In the original code, this should work normally
      expect(result).toBe("final");
      done();
    }).catch((error: Error) => {
      // In the mutated code, this might be triggered due to the changed condition
      done(error);
    });
  });
});