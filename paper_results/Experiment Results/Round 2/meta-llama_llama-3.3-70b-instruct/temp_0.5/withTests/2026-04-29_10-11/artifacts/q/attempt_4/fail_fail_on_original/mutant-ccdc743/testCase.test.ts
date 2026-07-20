import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when finally callback is not a function in mutated code", () => {
        expect(() => Q().finally(null)).toThrowError("Q can't apply finally callback");
    });
});