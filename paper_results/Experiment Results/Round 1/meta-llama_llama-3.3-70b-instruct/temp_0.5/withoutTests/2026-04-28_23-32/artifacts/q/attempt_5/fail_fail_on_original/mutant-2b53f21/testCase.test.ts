import { Q } from "./q.js";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const originalUnhandledRejections = Q.unhandledRejections;
        Q.unhandledRejections = [];

        rejection.then(null, function() {});

        expect(Q.unhandledRejections.length).toBe(0);
    });
});