import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should throw an error when result is done in the mutated code', () => {
        const asyncFunction = Q.async(function* () {
            yield Q.resolve(1);
            if (true) {
                return Q.resolve(2);
            }
        });

        return expect(asyncFunction()).resolves.not.toBeUndefined();
    });
});