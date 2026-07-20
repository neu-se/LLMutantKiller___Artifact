import { Q } from "./q.js";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const originalTrackRejection = Q.trackRejection;
        let trackRejectionCalled = false;
        Q.trackRejection = function(promise, reason) {
            trackRejectionCalled = true;
        };

        rejection.then(null, function() {});

        Q.trackRejection = originalTrackRejection;

        expect(trackRejectionCalled).toBe(true);
    });
});