import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when resolver is always true', () => {
        const originalQ = Q;
        Q = () => { return true; };
        expect(() => Q()).toThrow();
        Q = originalQ;
    });
});