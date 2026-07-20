import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should not throw synchronously when done() is called on a resolved promise", () => {
    // In normal Node.js environment without active domains, process.domain is null.
    // Original code: checks `process.domain` before calling .bind(), so no error.
    // Mutated code: condition is `true`, so it always calls process.domain.bind(...),
    // which throws TypeError: Cannot read properties of null (reading 'bind').
    expect(() => {
      Q.resolve(42).done();
    }).not.toThrow();
  });
});