import { Promise } from "../../../../../../../../subject_repositories/q/q";

describe('Promise', () => {
    it('should return a promise with a state of "unknown" when no inspect function is provided', () => {
        const promise = new Promise({}, void 0, function () {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});