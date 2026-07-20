import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a function", () => {
        expect(typeof Q.join).toBe("function");
    });
});