const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.async generator mutation test", () => {
  it("should detect mutation in generator handling", (done) => {
    // This test specifically targets the mutation where `typeof StopIteration === "undefined"`
    // was changed to `if (true)`, which affects how generators are handled
    const generator = Q.async(function* () {
      yield 1;
      yield 2;
      return "done";
    });

    generator().then((result: string) => {
      // In the mutated version, this should behave differently
      // because the condition is always true
      expect(result).toBe("done");
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });
});