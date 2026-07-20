import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.toString", () => {
    it("should throw an error when toString is not implemented", () => {
        const promise = Q(10);
        Promise.prototype.toString = function () { };
        expect(() => promise.toString()).toThrowError();
    });

    it("should return '[object Promise]' when toString is implemented", () => {
        const promise = Q(10);
        Promise.prototype.toString = function () {
            return "[object Promise]";
        };
        expect(promise.toString()).toBe("[object Promise]");
    });
});