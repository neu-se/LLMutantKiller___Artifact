import { Q } from "../q";

describe('Q library', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = true;
        const promise = Q.reject('Test rejection');
        Q.trackRejection(promise, 'Test rejection');
        expect(Q.getUnhandledReasons()).toEqual(['(no stack) Test rejection']);
    });

    it('should not track unhandled rejections when trackUnhandledRejections is false', () => {
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = false;
        const promise = Q.reject('Test rejection');
        Q.trackRejection(promise, 'Test rejection');
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});