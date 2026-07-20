import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const unhandledRejections = [];
        const originalUntrackRejection = Q.untrackRejection;
        Q.untrackRejection = function(promise) {
            unhandledRejections.push(promise);
        };

        rejection.then(null, function() {});

        expect(unhandledRejections).toContain(rejection);

        Q.untrackRejection = originalUntrackRejection;
    });
});