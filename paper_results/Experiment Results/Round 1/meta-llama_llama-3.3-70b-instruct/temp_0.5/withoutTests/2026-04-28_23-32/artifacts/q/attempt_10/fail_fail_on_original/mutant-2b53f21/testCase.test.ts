import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const originalGetUnhandledReasons = Q.getUnhandledReasons;
        Q.getUnhandledReasons = jest.fn(() => []);

        rejection.then(null, () => {});

        expect(Q.getUnhandledReasons).toHaveBeenCalledTimes(1);

        Q.getUnhandledReasons = originalGetUnhandledReasons;
    });
});