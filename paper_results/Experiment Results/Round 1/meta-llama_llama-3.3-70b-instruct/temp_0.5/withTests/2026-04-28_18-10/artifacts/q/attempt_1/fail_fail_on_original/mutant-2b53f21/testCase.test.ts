import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should untrack rejection when rejected", () => {
        const rejection = Q.reject(new Error());
        const unhandledRejectionsBefore = Q.getUnhandledReasons().length;
        rejection.catch(() => {});
        const unhandledRejectionsAfter = Q.getUnhandledReasons().length;
        expect(unhandledRejectionsAfter).toBeLessThan(unhandledRejectionsBefore);
    });
});