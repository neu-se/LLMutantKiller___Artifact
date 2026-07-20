import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should resolve with the correct value', () => {
        const asyncFunction = Q.async(function* () {
            yield Q.resolve(1);
            if (false) {
                throw new Error('Result is done');
            }
            return 2;
        });

        return expect(asyncFunction()).resolves.toBe(2);
    });
});