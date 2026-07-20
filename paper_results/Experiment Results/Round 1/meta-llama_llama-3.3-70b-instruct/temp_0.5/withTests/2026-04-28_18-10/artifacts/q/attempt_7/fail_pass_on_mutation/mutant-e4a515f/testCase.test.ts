import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should check the type of the resolver', () => {
        const resolver = function (resolve, reject) { };
        expect(typeof resolver).toBe('function');
        expect(() => Q(resolver)).not.toThrow();
    });
});