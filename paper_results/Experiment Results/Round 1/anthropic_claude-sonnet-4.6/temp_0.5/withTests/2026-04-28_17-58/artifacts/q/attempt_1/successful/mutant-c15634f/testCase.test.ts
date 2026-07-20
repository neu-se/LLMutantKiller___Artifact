import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
  it("should not throw when console.warn is not available", (done) => {
    const originalWarn = console.warn;
    (console as any).warn = undefined;

    let threw = false;
    try {
      // Q.allResolved is wrapped with deprecate()
      // Original: only warns if console.warn is a function
      // Mutated: always tries to call console.warn (throws if undefined)
      Q.allResolved([Q.resolve(1)]);
    } catch (e) {
      threw = true;
    } finally {
      (console as any).warn = originalWarn;
    }

    expect(threw).toBe(false);
    done();
  });
});