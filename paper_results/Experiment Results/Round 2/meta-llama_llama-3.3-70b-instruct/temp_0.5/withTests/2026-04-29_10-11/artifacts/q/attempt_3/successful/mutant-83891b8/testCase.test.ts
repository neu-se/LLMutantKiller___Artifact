import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
    it("should return the value of a fulfilled promise", () => {
        const promise = q(10);
        const result = q.nearer(promise);
        expect(result).toBe(10);
    });

    it("should return the original value if it's not a promise", () => {
        const value = 10;
        const result = q.nearer(value);
        expect(result).toBe(value);
    });

    it("should return the value of a non-fulfilled promise when the promise is not fulfilled", () => {
        const promise = q.reject(10);
        const result = q.nearer(promise);
        expect(result).toBe(promise);
    });
});