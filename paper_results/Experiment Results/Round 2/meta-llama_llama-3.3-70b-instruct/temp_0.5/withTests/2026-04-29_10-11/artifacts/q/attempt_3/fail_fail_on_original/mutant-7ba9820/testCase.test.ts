import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const obj = {
            test: function () {
                return "test";
            }
        };
        const promise = q.Q(obj);
        const result = promise.ninvoke("test");
        expect(result).resolves.toEqual("test");
    });
});