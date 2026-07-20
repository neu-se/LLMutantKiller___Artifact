import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should create a promise with unknown state when inspect is undefined', () => {
        const promise = Q.Promise({}, void 0, void 0);
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});