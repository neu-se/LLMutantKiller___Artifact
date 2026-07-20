import { Q } from "../../../../../../../q/q.js";

describe("Q", () => {
    it("should track rejection when rejected", () => {
        const rejection = Q.reject(new Error());
        rejection.catch(() => {
            expect(Q.getUnhandledReasons().length).toBe(0);
        });
    });
});