import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should be defined", () => {
        expect(Q).toBeDefined();
    });

    it("should be a function", () => {
        expect(typeof Q).toBe("function");
    });

    it("should return a promise when called with a value", () => {
        const promise = Q(42);
        expect(promise.then).toBeDefined();
    });

    it("should return a promise when called with a promise", () => {
        const innerPromise = Q(42);
        const promise = Q(innerPromise);
        expect(promise.then).toBeDefined();
    });

    it("should resolve the promise with the given value", () => {
        const promise = Q(42);
        promise.then((value) => {
            expect(value).toBe(42);
        });
    });

    it("should reject the promise with the given reason", () => {
        const promise = Q.reject("Error message");
        promise.catch((reason) => {
            expect(reason).toBe("Error message");
        });
    });
});