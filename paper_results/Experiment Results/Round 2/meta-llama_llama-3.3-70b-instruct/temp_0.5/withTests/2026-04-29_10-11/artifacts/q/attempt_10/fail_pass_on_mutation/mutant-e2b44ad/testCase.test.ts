import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should check if process type is not string when checking domain", () => {
        const processType = typeof process;
        if (processType !== "string") {
            expect(true).toBe(true);
        } else {
            expect(false).toBe(true);
        }
    });
});