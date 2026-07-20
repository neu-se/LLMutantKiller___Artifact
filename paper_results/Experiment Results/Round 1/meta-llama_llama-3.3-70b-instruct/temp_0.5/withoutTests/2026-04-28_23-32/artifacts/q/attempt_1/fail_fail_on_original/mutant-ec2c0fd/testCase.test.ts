import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async function', () => {
    it('should handle ES6 generators correctly', () => {
        function* myGenerator() {
            yield Q.resolve(1);
            yield Q.resolve(2);
            return Q.resolve(3);
        }

        const asyncGenerator = Q.async(myGenerator);
        const promise = asyncGenerator();

        return promise.then((result) => {
            expect(result).toBe(3);
        });
    });
});