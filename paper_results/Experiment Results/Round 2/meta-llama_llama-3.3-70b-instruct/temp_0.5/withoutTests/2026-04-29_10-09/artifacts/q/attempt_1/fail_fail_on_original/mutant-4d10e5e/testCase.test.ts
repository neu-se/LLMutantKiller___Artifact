import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack traces enabled by default', () => {
        const error = new Error();
        const promise = Q.reject(error);
        expect(promise.isRejected()).toBe(true);
        expect(promise.inspect().reason).toBe(error);
        expect(promise.inspect().reason.stack).toBeUndefined();
    });
});