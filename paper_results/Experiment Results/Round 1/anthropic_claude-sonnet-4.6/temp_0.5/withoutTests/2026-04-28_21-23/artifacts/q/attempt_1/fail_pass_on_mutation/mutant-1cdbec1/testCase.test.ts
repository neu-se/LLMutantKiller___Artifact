import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading behavior", () => {
  it("should load correctly and provide noConflict that throws in non-browser environment", () => {
    // In Node.js, Q loads via CommonJS branch, not the window/self branch
    // Q.noConflict should throw because it's not loaded as a global script
    expect(() => Q.noConflict()).toThrow("Q.noConflict only works when Q is used as a global");
    
    // Basic Q functionality should work
    return Q(42).then((val: number) => {
      expect(val).toBe(42);
    });
  });
});