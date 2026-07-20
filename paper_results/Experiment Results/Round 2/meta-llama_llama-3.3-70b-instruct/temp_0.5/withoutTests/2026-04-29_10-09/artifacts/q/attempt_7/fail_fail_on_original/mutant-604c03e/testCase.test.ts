import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', () => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        promise.then(() => {
            throw reason;
        });
        const spy = jest.spyOn(Q, 'untrackRejection');
        Q.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});