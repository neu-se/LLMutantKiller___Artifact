import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const callback = function () { throw new Error("Q can't apply finally callback"); };
        expect(() => Q().fin(callback)).toThrowError("Q can't apply finally callback");
    });
});