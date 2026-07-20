import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine mutation detection via stack line numbers", () => {
  it("should have qStartingLine set to a valid line number that filters internal frames", () => {
    Q.longStackSupport = true;

    // Force a rejection that propagates through Q internals
    // With correct qStartingLine/qEndingLine, the "captureLine" call itself
    // at the bottom of q.js (qEndingLine) should be filtered
    // If qStartingLine > qEndingLine somehow, filtering breaks

    return Q.reject(new Error("test"))
      .catch((err: Error) => {
        Q.longStackSupport = false;
        // The stack should exist and be a string
        expect(typeof err.stack).toBe("string");
        // With proper filtering, the stack trace length should be reasonable
        // (not containing hundreds of Q internal lines)
        const lines = (err.stack || "").split("\n").filter(l => l.includes("    at "));
        // If internal frame filtering works, we should have few lines
        // A broken filter would include all Q internals
        expect(lines.length).toBeLessThan(20);
      });
  });
});