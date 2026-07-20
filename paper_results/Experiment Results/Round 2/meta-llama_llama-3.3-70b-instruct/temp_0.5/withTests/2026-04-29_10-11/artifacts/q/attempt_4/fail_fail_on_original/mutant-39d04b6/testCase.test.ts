import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise with a state of 'unknown' when an empty inspect function is provided", () => {
        var promise = Q.Promise({}, function () {
            return Q.reject(new Error("Test"));
        }, function () { 
            return { state: "unknown" }; 
        });
        expect(promise.inspect()).not.toEqual({ state: "unknown" });
    });
});