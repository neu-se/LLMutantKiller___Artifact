import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator StopIteration handling", () => {
  it("detects mutation via Q.async with real ES6 generator and Q.return", async () => {
    const originalStopIteration = (global as any).StopIteration;

    try {
      // Don't set StopIteration - use ES6 generator path instead
      // In modern Node, StopIteration is undefined, so the ES6 path runs
      // Q.async with ES6 generators uses the standard path, not SpiderMonkey path
      
      // Test Q["return"] behavior which uses QReturnValue
      // In ES6 generator path, isStopIteration catches QReturnValue and returns Q(exception.value)
      // This is the non-SpiderMonkey path at the bottom of continuer
      
      const returnValue = 42;
      
      const asyncFn = Q.async(function* () {
        yield Q(1);
        Q["return"](returnValue);
        yield Q(2); // never reached
      });

      let resolvedValue: any = "NOT_SET";
      let rejectedValue: any = "NOT_SET";

      await new Promise<void>((done) => {
        asyncFn().then(
          (v: any) => { resolvedValue = v; done(); },
          (e: any) => { rejectedValue = e; done(); }
        );
      });

      // Q["return"] throws QReturnValue which passes isStopIteration
      // In ES6 path (StopIteration undefined): isStopIteration check happens
      // and returns Q(exception.value) = Q(42)
      expect(resolvedValue).toBe(returnValue);
      expect(rejectedValue).toBe("NOT_SET");
    } finally {
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});