import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should create a promise with the given descriptor and fallback", () => {
        const descriptor = {
            "when": function(resolve, op, args) {
                return resolve();
            }
        };
        const fallback = function(op) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        };
        const promise = Q.Promise(descriptor, fallback, function inspect() {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });

    it("should create a promise with the given descriptor and fallback when inspect is not undefined", () => {
        const descriptor = {
            "when": function(resolve, op, args) {
                return resolve();
            }
        };
        const fallback = function(op) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        };
        const inspect = function() {
            return { state: "unknown" };
        };
        const promise = Q.Promise(descriptor, fallback, inspect);
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});