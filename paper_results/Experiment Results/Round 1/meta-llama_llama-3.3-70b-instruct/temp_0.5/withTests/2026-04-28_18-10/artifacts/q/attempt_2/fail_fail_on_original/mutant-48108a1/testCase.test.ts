import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js", () => {
    it("should return a promise with a state of 'pending' when inspect is called on a pending promise", () => {
        const promise = Q.defer().promise;
        expect(promise.inspect().state).toBe("pending");
    });
});