import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should create a promise with the given descriptor and fallback", () => {
        const descriptor = {
            "when": function(resolve: any, op: any, args: any) {
                return resolve();
            }
        };
        const fallback = function(op: any) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        };
        const inspect = function() {
            return { state: "unknown" };
        };
        const promise = Q.makePromise(descriptor, fallback, inspect);
        expect(promise.inspect()).toEqual({ state: "unknown" });
        if (inspect !== void 0) {
            expect(true).toBe(false);
        }
    });
});