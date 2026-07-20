import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = q.Q(10).then(function () { return "test"; });
        return promise.then((value) => {
            expect(value).toBe("test");
        });
    });
});