import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should define qFileName and qStartingLine correctly", () => {
        // Check if qFileName and qStartingLine are defined
        expect((Q as any).qFileName).toBeDefined();
        expect((Q as any).qStartingLine).toBeDefined();
    });
});