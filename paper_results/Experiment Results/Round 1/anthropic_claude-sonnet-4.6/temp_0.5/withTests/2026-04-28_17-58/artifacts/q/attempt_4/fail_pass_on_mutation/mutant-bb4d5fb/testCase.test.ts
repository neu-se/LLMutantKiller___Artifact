import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

// Padding to ensure the test function body is at line numbers within Q's internal
// line range (Q's qStartingLine is ~50, qEndingLine is ~1900).
// The mutation changes isInternalFrame to filter ALL files by line number,
// not just q.js. So frames from this file at lines > qStartingLine would be
// incorrectly filtered by the mutant.
//
// ---- padding line 9 ----
// ---- padding line 10 ----
// ---- padding line 11 ----
// ---- padding line 12 ----
// ---- padding line 13 ----
// ---- padding line 14 ----
// ---- padding line 15 ----
// ---- padding line 16 ----
// ---- padding line 17 ----
// ---- padding line 18 ----
// ---- padding line 19 ----
// ---- padding line 20 ----
// ---- padding line 21 ----
// ---- padding line 22 ----
// ---- padding line 23 ----
// ---- padding line 24 ----
// ---- padding line 25 ----
// ---- padding line 26 ----
// ---- padding line 27 ----
// ---- padding line 28 ----
// ---- padding line 29 ----
// ---- padding line 30 ----
// ---- padding line 31 ----
// ---- padding line 32 ----
// ---- padding line 33 ----
// ---- padding line 34 ----
// ---- padding line 35 ----
// ---- padding line 36 ----
// ---- padding line 37 ----
// ---- padding line 38 ----
// ---- padding line 39 ----
// ---- padding line 40 ----
// ---- padding line 41 ----
// ---- padding line 42 ----
// ---- padding line 43 ----
// ---- padding line 44 ----
// ---- padding line 45 ----
// ---- padding line 46 ----
// ---- padding line 47 ----
// ---- padding line 48 ----
// ---- padding line 49 ----
// ---- padding line 50 ----
// ---- padding line 51 ----
// ---- padding line 52 ----
// ---- padding line 53 ----
// ---- padding line 54 ----
// ---- padding line 55 ----
// ---- padding line 56 ----
// ---- padding line 57 ----
// ---- padding line 58 ----
// ---- padding line 59 ----
// ---- padding line 60 ----

describe("long stack trace filtering", () => {
  it("should preserve user code frames from non-Q files in long stack traces", () => {
    Q.longStackSupport = true;

    function functionDefinedAtHighLineNumber() {
      const d = Q.defer();
      d.reject(new Error("rejection"));
      return d.promise;
    }

    return functionDefinedAtHighLineNumber().fail((e: Error) => {
      Q.longStackSupport = false;
      expect(e.stack).toContain("functionDefinedAtHighLineNumber");
    });
  });
});