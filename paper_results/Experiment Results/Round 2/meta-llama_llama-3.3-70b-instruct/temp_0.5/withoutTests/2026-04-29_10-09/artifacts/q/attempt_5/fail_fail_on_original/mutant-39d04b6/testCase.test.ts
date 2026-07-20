import { Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should return an object with a state of 'unknown' when inspect is called", () => {
        const promise = Promise({}, function () { }, function () {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });

    it("should return an object with a state of 'unknown' when inspect is called on a promise with no inspect function", () => {
        const promise = Promise({}, function () { }, function () {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});