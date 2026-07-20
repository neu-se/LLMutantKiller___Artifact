import { Q } from "../../../q.js";

describe('Q.race function', () => {
    it('should reject when no promises are resolved', () => {
        const promise1 = new Promise((resolve, reject) => {
            // never resolve or reject
        });
        const promise2 = new Promise((resolve, reject) => {
            // never resolve or reject
        });

        return Q.race([promise1, promise2]).then(() => {
            throw new Error('Q.race should not resolve');
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});