import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong stack modification", () => {
  it("adds long stack trace to error when promise has stack", (done) => {
    Q.longStackSupport = true;
    
    const d = Q.defer();
    const err = new Error("test");
    const originalStack = err.stack;
    
    d.promise.then(undefined, (e: any) => {
      Q.longStackSupport = false;
      try {
        // With longStackSupport, the error stack should be extended
        expect(e.stack).toContain("From previous event:");
        done();
      } catch(ex) {
        done(ex);
      }
    });
    
    d.reject(err);
  });
});