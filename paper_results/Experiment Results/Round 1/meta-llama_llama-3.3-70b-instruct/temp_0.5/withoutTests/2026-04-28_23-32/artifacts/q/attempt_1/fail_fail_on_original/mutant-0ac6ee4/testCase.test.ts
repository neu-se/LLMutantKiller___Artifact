import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create an error with the correct message when a timeout occurs', () => {
        const ms = 100;
        const error = new Error();
        const promise = Q.timeout(Promise.resolve(), ms, error);
        jest.spyOn(global, 'setTimeout').mockImplementationOnce((fn, time) => {
            fn();
        });
        expect(promise).rejects.toThrowError(`Timed out after ${ms} ms`);
    });
});