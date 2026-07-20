import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should check if the resolver is a function', () => {
        const resolver = function (resolve, reject) { };
        expect(Q(resolver)).toBeInstanceOf(Promise);
    });
});