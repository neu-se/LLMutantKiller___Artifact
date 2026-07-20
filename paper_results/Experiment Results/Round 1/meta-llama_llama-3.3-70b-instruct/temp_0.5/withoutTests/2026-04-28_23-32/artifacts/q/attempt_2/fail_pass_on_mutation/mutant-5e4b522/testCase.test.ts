import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when executed in a supported environment', () => {
        // The function should not throw an error
        expect(() => {
            Q();
        }).not.toThrowError();
    });
});