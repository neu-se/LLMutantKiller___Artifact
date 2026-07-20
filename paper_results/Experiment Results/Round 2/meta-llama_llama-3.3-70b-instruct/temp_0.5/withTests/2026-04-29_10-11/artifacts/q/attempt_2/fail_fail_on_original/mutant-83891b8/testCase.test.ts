import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
    it("should return the value of a fulfilled promise", () => {
        const promise = Q(10);
        const result = Q.nearer(promise);
        expect(result).toBe(10);
    });

    it("should return undefined for a rejected promise", () => {
        const promise = Q.reject(10);
        const result = Q.nearer(promise);
        expect(result).toBe(promise);
    });

    it("should return the original value if it's not a promise", () => {
        const value = 10;
        const result = Q.nearer(value);
        expect(result).toBe(value);
    });
});