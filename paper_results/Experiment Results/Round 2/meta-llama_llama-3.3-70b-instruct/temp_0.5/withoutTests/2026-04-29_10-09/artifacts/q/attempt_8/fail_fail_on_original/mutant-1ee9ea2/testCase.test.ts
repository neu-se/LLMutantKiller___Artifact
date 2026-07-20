describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        }

        const asyncFunction = Q.async(myGenerator);
        const result = await asyncFunction();
        expect(result).toBe(3);

        // Test the mutation
        function* myGeneratorMutation() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        }

        const asyncFunctionMutation = Q.async(myGeneratorMutation);
        try {
            const resultMutation = await asyncFunctionMutation();
            expect(resultMutation).not.toBeUndefined();
            fail("Expected Q.async to return undefined for the mutated code");
        } catch (error) {
            // This should not be reached
            fail("Expected Q.async to return a value for the mutated code");
        }
    });
});