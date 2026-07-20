import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const promise = Q("test");
        const thenHandler = jest.fn();
        promise.then(thenHandler);
        expect(thenHandler).toHaveBeenCalledTimes(1);
    });
});