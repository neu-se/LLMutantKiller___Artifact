import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
  it("should not filter stack frames from files other than q.js based on line number alone", async () => {
    Q.longStackSupport = true;

    // Generate many lines to push our code's line numbers into Q's range
    // Q has ~1900+ lines, so we need frames at high line numbers
    // Instead, let's directly test filterStackString behavior via observable stack traces
    
    // The approach: with long stack support, makeStackTraceLong calls filterStackString
    // which uses isInternalFrame. If mutation is present, frames from THIS file
    // at line numbers within Q's range (roughly lines 1-1900+) would be filtered.
    // Since this test file itself has line numbers starting at 1, those frames
    // would be filtered by the mutant.

    let capturedError: Error | null = null;

    const d = Q.defer<never>();
    
    await Q(1)
      .then(function step1() { return Q(2); })
      .then(function step2() { return d.promise; })
      .catch((err: Error) => {
        capturedError = err;
      });

    d.reject(new Error("test"));

    // Wait for rejection to propagate
    await new Promise(resolve => setTimeout(resolve, 50));

    Q.longStackSupport = false;

    expect(capturedError).not.toBeNull();
    // step1 and step2 are in this file at low line numbers
    // The mutant would filter them since line numbers fall within Q's range
    // The original would keep them since they're not from q.js
    const stack = capturedError!.stack || "";
    expect(stack).toMatch(/step1|step2/);
  });
});