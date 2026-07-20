import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generator return", () => {
  it("resolves with value when generator throws QReturnValue during iteration", async () => {
    (global as any).StopIteration = {};
    try {
      // Create a mock generator where next() throws a QReturnValue
      const mockGen = {
        next: function() {
          Q["return"](42); // throws QReturnValue inside next()
        }
      };
      
      const asyncFn = Q.async(function() { return mockGen as any; });
      
      const outcome = await new Promise<{type: string, value: any}>((done) => {
        asyncFn().then(
          (val: any) => done({type: "resolve", value: val}),
          (err: any) => done({type: "reject", value: err})
        );
      });

      expect(outcome.type).toBe("resolve");
      expect(outcome.value).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});