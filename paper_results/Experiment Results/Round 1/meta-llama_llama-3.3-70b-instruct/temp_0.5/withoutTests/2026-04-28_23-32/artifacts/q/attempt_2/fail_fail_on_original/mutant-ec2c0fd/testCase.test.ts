import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async function', () => {
    it('should handle StopIteration exception correctly', () => {
        function* myGenerator() {
            try {
                throw new QReturnValue(1);
            } catch (e) {
                if (Q.isStopIteration(e)) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        }

        const asyncGenerator = Q.async(myGenerator);
        const promise = asyncGenerator();

        return promise.then((result) => {
            expect(result).toBe(1);
        });
    });
});