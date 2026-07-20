import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should not throw an error when initializing the q module', () => {
        var originalCaptureLine = q.captureLine;
        q.captureLine = function() {
            return { line: 10, file: 'test.js' };
        };
        expect(() => {
            var qModule = require("../../../../../../../../../subject_repositories/q/q.js");
        }).not.toThrow();
        q.captureLine = originalCaptureLine;
    });
});