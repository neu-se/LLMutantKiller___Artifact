import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should create a promise with a default inspect function when none is provided", () => {
        const promise = Q.Promise({}, function(op: any) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        }, function() {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});