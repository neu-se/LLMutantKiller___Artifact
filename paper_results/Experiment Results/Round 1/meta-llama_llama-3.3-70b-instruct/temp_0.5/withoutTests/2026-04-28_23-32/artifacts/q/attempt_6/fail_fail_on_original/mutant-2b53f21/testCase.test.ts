import { Q } from "./q.js";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const unhandledReasonsBefore = Q.getUnhandledReasons().length;

        rejection.then(null, function() {});

        const unhandledReasonsAfter = Q.getUnhandledReasons().length;

        expect(unhandledReasonsBefore).toBeGreaterThan(unhandledReasonsAfter);
    });
});