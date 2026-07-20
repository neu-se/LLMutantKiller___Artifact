import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not create an extra promise when called with no callbacks", (done) => {
    const p = Q.resolve(42);
    let thenCallCount = 0;
    const originalThen = (p as any).__proto__.then;
    
    // Spy on then
    const spy = jest.spyOn(p as any, 'then').mockImplementation(function(this: any, ...args: any[]) {
      thenCallCount++;
      return originalThen.apply(this, args);
    });
    
    p.done();
    
    setTimeout(() => {
      spy.mockRestore();
      try {
        expect(thenCallCount).toBe(1);
        done();
      } catch (e) {
        done(e);
      }
    }, 50);
  });
});