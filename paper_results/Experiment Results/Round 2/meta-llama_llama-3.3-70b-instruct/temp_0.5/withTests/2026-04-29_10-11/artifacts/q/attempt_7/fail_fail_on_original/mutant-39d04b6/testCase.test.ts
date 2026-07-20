import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise with a state of 'rejected' when an error is thrown", () => {
        var promise = Q.Promise({}, function (resolve, reject) {
            reject(new Error("Test"));
        });
        expect(promise.inspect().state).toBe("rejected");
    });
});