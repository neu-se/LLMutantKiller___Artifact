import { Q } from "./q";

describe('Q', () => {
    it('should throw when Q.onerror is not called in the mutated code', () => {
        const error = new Error('Test error');
        Q.onerror = undefined;
        expect(() => Q.done(Q.reject(error))).toThrowError(error);
    });
});