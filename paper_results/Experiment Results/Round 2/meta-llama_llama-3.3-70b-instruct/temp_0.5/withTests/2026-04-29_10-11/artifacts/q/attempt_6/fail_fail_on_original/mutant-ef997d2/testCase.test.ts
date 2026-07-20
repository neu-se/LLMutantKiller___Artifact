import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q master function", () => {
    it("should return a promise with an inspect method that returns an object", () => {
        var object = {};
        var promise = Q.master(object);
        expect(typeof promise.inspect).toBe("function");
        expect(typeof promise.inspect()).toBe("object");
    });
});