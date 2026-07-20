import { Q } from "./q";

describe("Q", () => {
    it("should handle process object correctly", () => {
        expect(typeof process === "object").toBeTruthy();
        const promise = Q.reject(new Error("Test error"));
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons().length).toBeLessThan(1);
    });
});