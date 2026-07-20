import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async function', () => {
    it('should handle ES6 generators correctly', () => {
        function* myGenerator() {
            try {
                throw new Error();
            } catch (e) {
                return 1;
            }
        }

        const asyncGenerator = Q.async(myGenerator);
        const promise = asyncGenerator();

        return promise.then((result) => {
            expect(result).toBe(1);
        });
    });
});