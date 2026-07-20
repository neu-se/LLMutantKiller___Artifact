import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should track rejection when rejected", () => {
        const rejection = Q.reject(new Error());
        rejection.catch(() => {
            expect(Q.getUnhandledReasons().length).toBe(1);
        });
    });
});