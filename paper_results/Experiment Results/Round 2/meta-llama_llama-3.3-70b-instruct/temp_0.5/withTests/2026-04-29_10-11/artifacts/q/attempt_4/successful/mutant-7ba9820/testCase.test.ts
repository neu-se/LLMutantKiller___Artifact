import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const obj = {
            test: function () {
                return "test";
            }
        };
        const promise = q(obj);
        const result = promise.ninvoke("test");
        expect(result).resolves.toEqual("test");
    });
});