import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q master function", () => {
    it("should return a promise with inspect method", () => {
        var object = {};
        var promise = Q.master(object);
        expect(promise.inspect).toBeInstanceOf(Function);
    });
});