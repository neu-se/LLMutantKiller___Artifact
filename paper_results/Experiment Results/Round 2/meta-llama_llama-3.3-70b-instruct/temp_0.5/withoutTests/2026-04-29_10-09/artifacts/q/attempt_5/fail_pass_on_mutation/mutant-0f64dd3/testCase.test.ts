import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should create a promise without throwing an error', () => {
        expect(() => {
            var qPromise = q.resolve();
        }).not.toThrow();
    });
});