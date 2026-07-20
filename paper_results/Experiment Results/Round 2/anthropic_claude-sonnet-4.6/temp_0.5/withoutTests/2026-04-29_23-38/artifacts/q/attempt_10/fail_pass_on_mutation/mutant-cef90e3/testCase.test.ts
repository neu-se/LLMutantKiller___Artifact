import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag", () => {
  it("deferred should not be resolved twice", (done) => {
    const d = Q.defer();
    const resolutions: any[] = [];
    
    const p = d.promise.then(
      (v: any) => { resolutions.push({ type: "fulfilled", value: v }); return v; },
      (e: any) => { resolutions.push({ type: "rejected", error: e }); return -1; }
    );
    
    Q.nextTick(() => {
      d.notify("x");
      d.resolve(42);
      
      Q.nextTick(() => {
        Q.nextTick(() => {
          Q.nextTick(() => {
            try {
              // Original: resolutions = [{ type: "rejected", error: "x" }] (from notify)
              // OR resolutions = [{ type: "fulfilled", value: 42 }] (from resolve)
              // Mutated: might have both
              expect(resolutions.length).toBe(1);
              done();
            } catch (e) {
              done(e as Error);
            }
          });
        });
      });
    });
  });
});