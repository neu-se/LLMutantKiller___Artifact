import { Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should return a promise with a state of 'unknown' when no inspect function is provided", () => {
        const promise = new Promise({}, function () { }, function () {
            return { state: "unknown" };
        });
        expect(promise.inspect().state).toBe("unknown");
    });

    it("should return a promise with no inspect function when no inspect function is provided", () => {
        const promise = new Promise({}, function () { }, function () { });
        expect(promise.inspect).toBeUndefined();
    });
});