import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle async function correctly with StopIteration', async () => {
        Q["return"] = function(value) {
            throw new Error("QReturnValue not implemented");
        };

        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            Q["return"](2);
        });

        try {
            await asyncFunction();
        } catch (error) {
            expect(error.message).toBe("QReturnValue not implemented");
        }
    });
});