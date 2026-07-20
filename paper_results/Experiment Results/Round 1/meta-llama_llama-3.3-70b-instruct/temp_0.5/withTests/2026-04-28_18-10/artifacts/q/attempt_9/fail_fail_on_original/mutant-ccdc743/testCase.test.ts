import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var callback = function () {};
        var promise = Q("test");
        expect(() => promise.fin("not a function")).toThrowError("Q can't apply finally callback");
    });
});