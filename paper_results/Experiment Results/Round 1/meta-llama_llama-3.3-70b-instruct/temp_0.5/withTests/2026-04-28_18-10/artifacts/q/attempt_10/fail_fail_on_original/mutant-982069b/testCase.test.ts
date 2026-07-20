import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a function to filter internal stack frames", () => {
        expect(typeof Q.filterStackString).toBe("function");
    });
});