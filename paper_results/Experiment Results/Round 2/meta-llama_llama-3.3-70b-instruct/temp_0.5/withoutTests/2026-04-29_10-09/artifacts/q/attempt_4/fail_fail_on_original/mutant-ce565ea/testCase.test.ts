import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a promise when the object is pending', () => {
        const promise = Q.defer().promise;
        expect(promise.inspect().state).toBe('pending');
        promise.valueOf = function() {
            return this;
        }
        expect(promise.valueOf()).not.toBe(promise);
    });
});