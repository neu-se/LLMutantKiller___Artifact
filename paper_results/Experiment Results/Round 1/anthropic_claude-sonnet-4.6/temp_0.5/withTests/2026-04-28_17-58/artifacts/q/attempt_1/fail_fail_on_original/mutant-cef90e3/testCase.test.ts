import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then done guard", () => {
  it("should only call the fulfilled callback once even if the underlying promise resolves and rejects", (done) => {
    // Create a misbehaving promise that calls both resolve and reject
    const badPromise = new Q.Promise({
      when: function(rejected: any) {
        return rejected ? rejected(new Error("rejected")) : undefined;
      }
    }, function fallback(op: string, args: any[]) {
      if (op === "when") {
        // Call both the fulfilled callback and the rejected callback
        const fulfilledCallback = args[0];
        const rejectedCallback = args[1];
        if (fulfilledCallback) {
          fulfilledCallback(42);
        }
        if (rejectedCallback) {
          rejectedCallback(new Error("also rejected"));
        }
      }
      return Q(undefined);
    }, function inspect() {
      return { state: "fulfilled", value: 42 };
    });

    const results: any[] = [];

    badPromise.then(
      function(value: any) {
        results.push({ type: "fulfilled", value });
      },
      function(reason: any) {
        results.push({ type: "rejected", reason });
      }
    ).then(function() {
      // After the promise chain settles, only one callback should have been called
      expect(results.length).toBe(1);
      expect(results[0].type).toBe("fulfilled");
      expect(results[0].value).toBe(42);
      done();
    }).fail(function(err: any) {
      done(err);
    });
  });
});