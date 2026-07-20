import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should pass when given a function as a resolver', () => {
        expect(() => Q((resolve, reject) => {})).not.toThrow();
    });
});