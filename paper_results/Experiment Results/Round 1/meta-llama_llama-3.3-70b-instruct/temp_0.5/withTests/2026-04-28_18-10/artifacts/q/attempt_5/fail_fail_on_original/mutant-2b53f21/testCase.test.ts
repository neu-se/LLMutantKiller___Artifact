import { Q } from "../../../q";

describe("Q", () => {
    it("should untrack rejection when rejected", () => {
        const rejection = Q.reject(new Error());
        rejection.catch(() => {
            expect(Q.getUnhandledReasons().length).toBe(0);
        });
    });
});