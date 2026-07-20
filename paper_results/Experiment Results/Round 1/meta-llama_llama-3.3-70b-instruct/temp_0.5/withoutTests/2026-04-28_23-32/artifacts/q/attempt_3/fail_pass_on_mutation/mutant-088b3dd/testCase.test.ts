import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const promise = Q("test");
        expect(promise.then((value) => value)).resolves.toBe("test");
    });
});