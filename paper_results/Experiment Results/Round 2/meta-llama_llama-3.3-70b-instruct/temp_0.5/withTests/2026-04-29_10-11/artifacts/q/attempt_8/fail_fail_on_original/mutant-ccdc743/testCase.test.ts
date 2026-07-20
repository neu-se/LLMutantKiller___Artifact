import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when finally callback is a function", () => {
        expect(() => Q().finally(function() {})).not.toThrow();
    });
});