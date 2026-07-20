import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey Q.return", () => {
  it("resolves (not rejects) with value from Q.return when StopIteration is defined", async () => {
    (global as any).StopIteration = {};
    try {
      const asyncFn = Q.async(function() {
        Q["return"](99);
      });
      
      let resolved: any;
      let rejected: any;
      
      await new Promise<void>((res) => {
        asyncFn().then(
          (val: any) => { resolved = val; res(); },
          (err: any) => { rejected = err; res(); }
        );
      });
      
      expect(rejected).toBeUndefined();
      expect(resolved).toBe(99);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});