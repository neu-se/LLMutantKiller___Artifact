import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when resolver is a function', () => {
        expect(() => Q(function (resolve, reject) { resolve(); })).not.toThrow();
    });
});