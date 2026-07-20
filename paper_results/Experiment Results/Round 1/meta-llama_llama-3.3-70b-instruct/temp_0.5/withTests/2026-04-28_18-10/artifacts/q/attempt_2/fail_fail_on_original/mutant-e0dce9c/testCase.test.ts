import { Q } from "../../../../../q";

describe("Promise.prototype.valueOf", () => {
    it("should return the value of the promise when the promise is fulfilled and not rejected", () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
    });

    it("should return the promise itself when the promise is rejected", () => {
        const promise = Q.reject(new Error("Test"));
        expect(promise.valueOf()).toBe(promise);
    });
});