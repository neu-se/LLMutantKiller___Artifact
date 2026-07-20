import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.prototype.finally with successful callback on fulfilled promise", () => {
  it("should resolve with original value when finally callback succeeds", async () => {
    let finallyRan = false;
    
    const result = await Q.resolve(99)["finally"](function() {
      finallyRan = true;
      // callback succeeds normally
    });
    
    expect(finallyRan).toBe(true);
    // With original (threw=true then threw=false): resolves with 99
    // With mutation (threw=true stays true): may reject or behave differently
    expect(result).toBe(99);
  });
});