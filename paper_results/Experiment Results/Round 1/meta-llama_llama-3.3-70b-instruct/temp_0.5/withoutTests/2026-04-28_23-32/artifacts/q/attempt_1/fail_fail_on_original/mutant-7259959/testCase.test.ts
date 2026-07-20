import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should resolve with the correct value', () => {
        const asyncFunction = Q.async(function* () {
            yield Q.resolve(1);
            return 2;
        });

        return asyncFunction().then((result) => {
            expect(result).toBe(2);
        });
    });
});