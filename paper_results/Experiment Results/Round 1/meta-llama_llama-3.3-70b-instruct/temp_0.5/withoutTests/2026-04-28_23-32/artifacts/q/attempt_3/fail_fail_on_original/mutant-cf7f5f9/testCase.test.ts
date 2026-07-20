import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when Q.onerror is not called', () => {
        const error = new Error('Test error');
        const onerrorSpy = jest.fn();
        Q.onerror = onerrorSpy;
        expect(() => Q.done(Q.reject(error))).toThrowError(error);
    });
});