import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should have a state of 'unknown' when no inspect function is provided", () => {
        const promise = Q(Promise({}));
        expect(promise.inspect().state).toBe("unknown");
    });
});