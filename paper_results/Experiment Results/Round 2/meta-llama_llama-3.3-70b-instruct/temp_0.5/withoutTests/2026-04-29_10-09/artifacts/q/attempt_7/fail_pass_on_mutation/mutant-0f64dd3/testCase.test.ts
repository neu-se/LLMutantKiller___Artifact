import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should create a promise without throwing an error when captureLine returns null', () => {
        var originalCaptureLine = q.captureLine;
        q.captureLine = function() {
            return null;
        };
        expect(() => {
            var qPromise = q.resolve();
        }).not.toThrow();
        q.captureLine = originalCaptureLine;
    });
});