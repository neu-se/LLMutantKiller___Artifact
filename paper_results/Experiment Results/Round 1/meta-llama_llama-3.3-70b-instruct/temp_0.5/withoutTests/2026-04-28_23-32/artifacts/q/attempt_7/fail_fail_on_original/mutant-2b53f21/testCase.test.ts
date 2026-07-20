import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.reject', () => {
    it('should untrack rejection when rejected callback is provided', () => {
        const rejection = Q.reject('test reason');
        const originalUntrackRejection = Q.untrackRejection;
        Q.untrackRejection = jest.fn();

        rejection.then(null, () => {});

        expect(Q.untrackRejection).toHaveBeenCalledTimes(1);

        Q.untrackRejection = originalUntrackRejection;
    });
});