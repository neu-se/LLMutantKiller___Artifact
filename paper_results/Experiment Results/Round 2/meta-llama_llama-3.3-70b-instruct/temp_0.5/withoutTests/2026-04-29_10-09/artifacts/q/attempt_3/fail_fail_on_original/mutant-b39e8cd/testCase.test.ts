import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise isRejected method', () => {
    it('should throw an error when isRejected method is called on a promise', () => {
        const promise = Q.reject('Test rejection reason');
        expect(() => promise.isRejected()).toThrow();
    });
});