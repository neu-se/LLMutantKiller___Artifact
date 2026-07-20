import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation detection", () => {
  it("error stack trace should not be empty when longStackSupport is enabled", async () => {
    Q.longStackSupport = true;

    let caughtError: any = null;

    await Q(1)
      .then(() => Q.reject(new Error("test error")))
      .then(() => {})
      .fail((e: any) => { caughtError = e; });

    Q.longStackSupport = false;

    expect(caughtError).not.toBeNull();
    const stack: string = caughtError.stack || "";

    // Original: filterStackString returns filtered non-empty lines joined -> non-empty stack
    // Mutated: if (true) {} does nothing, desiredLines stays empty -> stack becomes ""
    expect(stack.length).toBeGreaterThan(0);
  });
});