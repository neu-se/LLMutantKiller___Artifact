describe("array_indexOf shim with native indexOf removed", () => {
  it("should correctly iterate forward (i++) not backward (i--) in the indexOf shim", async () => {
    // Save and remove native indexOf before module loads
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    // Force fresh module load so the shim fallback is captured instead of native
    jest.resetModules();
    const Q = (await import("../../../../../../../../../../../subject_repositories/q/q.js")).default;

    // Restore native indexOf
    Array.prototype.indexOf = originalIndexOf;

    // Now array_indexOf uses the shim with i++ (original) or i-- (mutant)
    // untrackRejection uses array_indexOf to find promises in unhandledRejections
    // If i-- is used, it infinite loops; if i++ is used, it works correctly
    
    const deferred = Q.defer();
    deferred.reject(new Error("test"));
    
    const result = await deferred.promise.then(
      () => "fulfilled",
      () => "handled"
    );
    
    expect(result).toBe("handled");
    
    // If the shim used i--, untrackRejection would infinite loop
    // and we'd never get here
    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBe(0);
  });
});