import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        expect(() => Q().fin(123)).toThrowError("Q can't apply finally callback");
    });
});