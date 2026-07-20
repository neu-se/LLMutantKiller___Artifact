import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.join', () => {
    it('should resolve with the value if the two promises are the same', () => {
        const promise1 = Q(1);
        const promise2 = Q(1);
        return Q.join(promise1, promise2).then((value) => {
            expect(value).toBe(1);
        });
    });

    it('should reject if the two promises are different', () => {
        const promise1 = Q(1);
        const promise2 = Q(2);
        return Q.join(promise1, promise2).then(() => {
            throw new Error('Expected promise to reject');
        }).catch((error) => {
            expect(error.message).toBe('Q can\'t join: not the same: 1 2');
        });
    });
});