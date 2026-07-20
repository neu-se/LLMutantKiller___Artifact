import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return the promise itself when the promise is pending', () => {
        const promise = Q.defer().promise;
        expect(promise.valueOf()).toBe(promise);
    });
});