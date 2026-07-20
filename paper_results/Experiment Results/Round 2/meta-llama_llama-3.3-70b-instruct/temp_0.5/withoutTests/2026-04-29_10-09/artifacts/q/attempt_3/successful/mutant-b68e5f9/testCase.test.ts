import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should return the promise when no nodeback is provided', () => {
        const promise = Q('test');
        const result = promise.nodeify(null);
        expect(result).toBe(promise);
    });
});