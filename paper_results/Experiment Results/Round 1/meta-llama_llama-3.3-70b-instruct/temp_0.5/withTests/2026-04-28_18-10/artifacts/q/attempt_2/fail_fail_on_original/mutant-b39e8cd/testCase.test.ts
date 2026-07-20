import { Q } from "../../../q";

describe("Promise", () => {
    it("should correctly identify a rejected promise", () => {
        const error = new Error("Test error");
        const rejectedPromise = Q.reject(error);
        expect(Q.isRejected(rejectedPromise)).toBe(true);
    });
});