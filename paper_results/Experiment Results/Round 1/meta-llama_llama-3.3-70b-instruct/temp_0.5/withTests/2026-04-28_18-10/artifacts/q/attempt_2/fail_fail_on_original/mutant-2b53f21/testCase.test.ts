import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should untrack rejection when rejected", () => {
        const rejection = Q.reject(new Error());
        const originalUnhandledRejections = Q.getUnhandledReasons().length;
        rejection.catch(() => {});
        Q.nextTick(() => {
            const newUnhandledRejections = Q.getUnhandledReasons().length;
            expect(newUnhandledRejections).toBeLessThan(originalUnhandledRejections);
        });
    });
});