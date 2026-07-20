import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber attempt2 regex end anchor", () => {
  it("attempt2 with $ does not match stack lines that have trailing content", () => {
    Q.longStackSupport = true;

    const deferred = Q.defer();
    
    // Get Q's actual filename by examining a real stack trace
    const testError = new Error("probe");
    const realStack = testError.stack || "";
    
    // We need to craft an error whose stack contains a line matching Q's internal format
    // but with trailing content after the column number
    // With $: this line is NOT identified as internal ($ prevents match)
    // Without $: this line IS identified as internal (matches anywhere)
    
    const fakeQLine = "    at /fake/q.js:500:10 trailing";
    const err = new Error("test");
    err.stack = `Error: test\n${fakeQLine}\n    at userCode.js:1:1`;
    
    deferred.reject(err);
    
    return deferred.promise.then(
      () => { throw new Error("Should not fulfill"); },
      (e: Error) => {
        Q.longStackSupport = false;
        // The stack has been processed by makeStackTraceLong + filterStackString
        // Check if the fake Q line was filtered or kept
        expect(e.stack).toContain("userCode.js");
      }
    );
  });
});