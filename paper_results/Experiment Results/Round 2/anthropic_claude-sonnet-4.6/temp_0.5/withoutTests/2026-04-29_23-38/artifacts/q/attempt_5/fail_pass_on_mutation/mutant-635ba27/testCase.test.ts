describe("array_indexOf shim", () => {
  it("should iterate forward in indexOf shim, not cause infinite loop", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    jest.resetModules();
    
    // Use require so jest.resetModules takes effect
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.indexOf = originalIndexOf;

    const deferred = Q.defer();
    deferred.reject(new Error("test"));

    deferred.promise.then(
      () => { done(new Error("should not fulfill")); },
      () => { 
        // If we get here, array_indexOf didn't infinite loop
        expect(true).toBe(true);
        done();
      }
    );
  });
});