import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should be defined", () => {
        expect(Q).toBeDefined();
    });

    it("should be a function", () => {
        expect(typeof Q).toBe("function");
    });

    it("should return a promise when called with a value", () => {
        const promise = Q(42);
        expect(promise).toBeDefined();
        expect(typeof promise.then).toBe("function");
    });

    it("should return a promise when called with a promise", () => {
        const innerPromise = Q(42);
        const promise = Q(innerPromise);
        expect(promise).toBeDefined();
        expect(typeof promise.then).toBe("function");
    });

    it("should resolve to the original value when called with a non-promise value", (done) => {
        const value = 42;
        Q(value).then((resolvedValue) => {
            expect(resolvedValue).toBe(value);
            done();
        });
    });

    it("should resolve to the resolved value of the inner promise when called with a promise", (done) => {
        const innerPromise = Q(42);
        Q(innerPromise).then((resolvedValue) => {
            expect(resolvedValue).toBe(42);
            done();
        });
    });

    it("should handle window and self correctly", (done) => {
        const global = typeof window !== "undefined" ? window : self;
        expect(global).toBeDefined();
        done();
    });
});