import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should not be undefined", () => {
        expect(typeof Q.any).toBe('function');
    });
});