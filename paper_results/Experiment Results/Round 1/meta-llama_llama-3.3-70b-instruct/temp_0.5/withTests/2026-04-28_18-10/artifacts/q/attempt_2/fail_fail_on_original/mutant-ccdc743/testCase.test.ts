import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var callback = function () {};
        expect(() => Q().fin(callback)).not.toThrowError();
    });
});