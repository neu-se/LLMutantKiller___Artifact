import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined', () => {
        const promise = Q.Promise({}, undefined, function () {
            return { state: "unknown" };
        });
        const inspect = function () {
            return { state: "rejected" };
        };
        const promise2 = Q.Promise({}, inspect, function () {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
        expect(promise2.inspect()).not.toEqual({ state: "unknown" });
    });
});