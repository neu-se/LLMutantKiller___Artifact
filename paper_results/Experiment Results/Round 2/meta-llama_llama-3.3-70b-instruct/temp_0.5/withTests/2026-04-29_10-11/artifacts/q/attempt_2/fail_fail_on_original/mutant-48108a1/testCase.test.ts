import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return an object with a state property when calling inspect on a pending promise', () => {
        const promise = Q.defer().promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});