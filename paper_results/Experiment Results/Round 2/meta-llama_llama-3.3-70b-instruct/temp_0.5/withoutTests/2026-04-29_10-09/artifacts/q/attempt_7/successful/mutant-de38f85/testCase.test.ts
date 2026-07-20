import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = q(obj);
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        return promise.keys().then(() => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith('keys', []);
            expect(dispatchSpy.mock.calls[0][0]).not.toBe('');
        });
    });
});