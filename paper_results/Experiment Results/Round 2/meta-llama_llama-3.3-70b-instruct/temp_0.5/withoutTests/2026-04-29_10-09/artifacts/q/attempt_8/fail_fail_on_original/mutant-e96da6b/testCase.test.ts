import { Q } from './q';

describe("Q.delay function", () => {
    it("should throw an error when Q.delay is called with no arguments", () => {
        expect(() => Q.delay()).toThrowError();
    });

    it("should return a function that delays the resolution of a promise", () => {
        const promise = Q.delay(Promise.resolve("test"), 100);
        expect(promise).toBeInstanceOf(Promise);
    });

    it("should have a specific implementation", () => {
        expect(Q.delay.toString()).toContain("function (object, timeout)");
    });
});