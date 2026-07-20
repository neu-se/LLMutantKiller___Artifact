import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', () => {
        const promise = Q.reject(new Error('Test reason'));
        const spy = jest.spyOn(console, 'error');
        promise.catch((error) => {
            expect(error.message).toBe('Test reason');
        });
        expect(spy).not.toHaveBeenCalled();
        Q.nextTick(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});