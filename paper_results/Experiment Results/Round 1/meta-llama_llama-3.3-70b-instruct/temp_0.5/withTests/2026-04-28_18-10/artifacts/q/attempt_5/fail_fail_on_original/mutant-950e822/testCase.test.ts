import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.toString", () => {
    it("should throw an error when toString is not implemented", () => {
        const promise = Q(10);
        const originalToString = Promise.prototype.toString;
        Promise.prototype.toString = function () { };
        expect(() => promise.toString()).toThrowError();
        Promise.prototype.toString = originalToString;
    });

    it("should return '[object Promise]' when toString is implemented", () => {
        const promise = Q(10);
        expect(promise.toString()).toBe("[object Promise]");
    });
});