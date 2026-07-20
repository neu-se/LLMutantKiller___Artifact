describe("array_indexOf shim", () => {
  it("should use forward iteration in indexOf shim", () => {
    // Save and remove native indexOf
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;
    
    expect((Array.prototype as any).indexOf).toBeUndefined();
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    Array.prototype.indexOf = originalIndexOf;

    // array_indexOf is called synchronously in untrackRejection
    // untrackRejection is called synchronously inside the "when" descriptor handler
    // which is called when promiseDispatch runs
    // 
    // We can trigger this synchronously by calling promiseDispatch directly
    // on a rejected promise with a rejected handler
    const rejectedPromise = Q.reject(new Error("test"));
    
    // This synchronously calls promiseDispatch which calls untrackRejection
    // which calls array_indexOf - with i-- this hangs synchronously
    let called = false;
    rejectedPromise.promiseDispatch(null, "when", [function() { called = true; }]);
    
    expect(called).toBe(true);
  });
});