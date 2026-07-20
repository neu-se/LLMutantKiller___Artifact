import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with undefined inspect", () => {
    it("should provide a default inspect function returning {state: 'unknown'} when inspect is not provided", () => {
        // Q.master creates a Promise with a custom inspect, but we can test
        // via the Promise constructor behavior indirectly
        // When Promise is called without inspect argument, it should default to returning {state: "unknown"}
        const deferred = Q.defer();
        // A deferred promise before resolution should have state "pending"
        // but we need to test the fallback inspect
        // Use Q.makePromise directly with only 2 args
        const p = Q.makePromise(
            { "when": function(rejected: any) { return 42; } },
            function fallback() { return this; }
        );
        expect(p.inspect()).toEqual({ state: "unknown" });
    });
});