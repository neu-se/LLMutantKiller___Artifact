import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        expect(Q.getUnhandledReasons()).toEqual(['(no stack) Test rejection']);
        promise.catch(() => {});
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});