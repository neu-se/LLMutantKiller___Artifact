import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done", () => {
  it("should attach error handler directly to promise when called with no callbacks", () => {
    const p = Q(42);
    const thenSpy = jest.spyOn(p as any, 'then');
    
    p.done(null); // null is falsy, so original uses `this` directly
    
    // With original: promise = this (= p), so p.then(void 0, onUnhandledError) is called
    // The second argument (rejected handler) should be a function (onUnhandledError)
    // With mutated: promise = this.then(null, undefined, undefined), so p.then(null, undefined, undefined) is called
    // The second argument is undefined
    
    expect(thenSpy).toHaveBeenCalledTimes(1);
    expect(thenSpy.mock.calls[0][1]).toBeDefined();
  });
});