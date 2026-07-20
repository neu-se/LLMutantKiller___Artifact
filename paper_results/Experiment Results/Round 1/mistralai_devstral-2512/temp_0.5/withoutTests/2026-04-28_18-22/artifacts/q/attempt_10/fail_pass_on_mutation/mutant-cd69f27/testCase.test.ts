import "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library SES environment", () => {
  it("should not execute ses.makeQ when ses.ok() returns false", () => {
    // Create a mock SES environment that throws when makeQ is called
    const mockSes = {
      ok: () => false,
      makeQ: () => { throw new Error("ses.makeQ was called"); }
    };

    // Set up the mock SES environment
    (global as any).ses = mockSes;

    // Force re-evaluation of the Q module to trigger SES path
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // In the original code, this should not throw because ses.makeQ is never called
    // In the mutated code, this will throw because ses.makeQ is called
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();

    // Clean up
    delete (global as any).ses;
  });
});