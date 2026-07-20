import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should return a promise when called with a callback", () => {
        const promise = Q(10);
        const callback = jest.fn();
        const result = promise.nodeify(callback);
        expect(result).toBe(promise);
    });

    it("should throw an error when called without a callback in the mutated code", () => {
        const promise = Q(10);
        expect(() => promise.nodeify()).toThrowError();
    });
});