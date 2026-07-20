import { Q, Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should return an object with a state when inspect is called", () => {
        const promise = new Promise({}, function () { return { state: "unknown" }; });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });

    it("should return an object with a state when inspect is called on a promise with no inspect function", () => {
        const promise = new Promise({}, function () { });
        expect(() => promise.inspect()).not.toThrow();
    });
});