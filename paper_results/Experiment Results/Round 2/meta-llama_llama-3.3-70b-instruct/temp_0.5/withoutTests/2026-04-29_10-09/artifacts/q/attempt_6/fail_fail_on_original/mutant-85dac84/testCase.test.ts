import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when thenReject is called with no implementation', () => {
        const promise = Q.resolve();
        expect(() => promise.thenReject()).toThrowError();
    });
});