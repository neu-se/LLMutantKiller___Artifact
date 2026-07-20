import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        var promise = Q.reject('test');
        Q.untrackRejection = function(promise) {
            var at = Q.array_indexOf(Q.unhandledRejections, promise);
            if (at !== -1) {
                Q.unhandledRejections.splice(at, 1);
                Q.unhandledReasons.splice(at, 1);
            }
        };
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});