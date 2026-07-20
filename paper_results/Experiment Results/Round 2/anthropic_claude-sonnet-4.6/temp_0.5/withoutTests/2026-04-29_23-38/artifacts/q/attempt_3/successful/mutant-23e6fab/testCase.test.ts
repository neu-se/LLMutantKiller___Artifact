import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation", () => {
  it("should handle rejection with long stack support without crashing", () => {
    // Save and restore longStackSupport
    const original = Q.longStackSupport;
    Q.longStackSupport = true;
    
    // Create deferred AFTER enabling long stack support
    // so promise.stack gets set (needed for makeStackTraceLong to run)
    const deferred = Q.defer();
    
    deferred.reject(new Error("test"));
    
    // _rejected calls makeStackTraceLong which calls filterStackString
    // which calls isInternalFrame for each line including "Error: test"
    // which calls getFileNameAndLineNumber("Error: test")
    // attempt1: no match, attempt2: no match, attempt3: null
    // mutation: if(true) -> null[1] -> TypeError thrown
    
    return deferred.promise
      .then(
        () => { Q.longStackSupport = original; throw new Error("should not fulfill"); },
        (err: Error) => { Q.longStackSupport = original; expect(err.message).toBe("test"); }
      );
  });
});