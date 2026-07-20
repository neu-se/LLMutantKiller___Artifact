import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then done flag", () => {
  it("should not call rejection handler after fulfillment from custom promise", () => {
    const calls: string[] = [];
    
    // Create a custom promise that fulfills but also later triggers the rejection path
    const customPromise = Q.makePromise({
      "when": function(this: any, rejected: Function) {
        // Schedule the rejection callback to fire after we return
        if (rejected) {
          Q.nextTick(function() {
            rejected(new Error("late rejection"));
          });
        }
        return 42; // fulfill with 42
      }
    }, undefined, function() {
      return { state: "fulfilled", value: 42 };
    });

    return customPromise.then(
      (v: number) => { calls.push("fulfilled:" + v); },
      (e: Error) => { calls.push("rejected:" + e.message); }
    ).then(() => {
      // Need to wait for the late rejection to fire
      return Q.Promise(function(resolve: Function) {
        setTimeout(resolve, 50);
      });
    }).then(() => {
      expect(calls).toEqual(["fulfilled:42"]);
    });
  });
});