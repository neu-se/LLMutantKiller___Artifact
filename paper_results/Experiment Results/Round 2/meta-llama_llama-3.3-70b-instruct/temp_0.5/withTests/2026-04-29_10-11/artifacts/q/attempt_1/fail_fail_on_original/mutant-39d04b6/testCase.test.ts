import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise with a state of 'unknown' when no inspect function is provided", () => {
        var promise = Q.Promise({}, function () {
            return Q.reject(new Error("Test"));
        });
        expect(promise.inspect()).toEqual({ state: "rejected", reason: new Error("Test") });
    });
});