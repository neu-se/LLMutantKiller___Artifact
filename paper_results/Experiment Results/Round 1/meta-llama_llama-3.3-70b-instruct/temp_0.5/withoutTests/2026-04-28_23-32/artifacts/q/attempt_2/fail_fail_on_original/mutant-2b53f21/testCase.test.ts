import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const originalUntrackRejection = Q.untrackRejection;
        let untrackRejectionCalled = false;
        Q.untrackRejection = function(promise) {
            untrackRejectionCalled = true;
        };

        rejection.then(null, function() {});

        expect(untrackRejectionCalled).toBe(true);

        Q.untrackRejection = originalUntrackRejection;
    });
});