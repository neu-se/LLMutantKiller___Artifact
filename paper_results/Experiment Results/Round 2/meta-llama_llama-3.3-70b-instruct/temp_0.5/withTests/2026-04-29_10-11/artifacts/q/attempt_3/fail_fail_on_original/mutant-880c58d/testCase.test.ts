import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should be disabled by default", () => {
        expect(Q.longStackSupport).toBe(false);
    });
});