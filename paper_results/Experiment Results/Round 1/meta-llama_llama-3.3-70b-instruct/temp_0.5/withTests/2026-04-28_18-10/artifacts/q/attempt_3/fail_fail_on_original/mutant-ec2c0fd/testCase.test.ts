import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Q.delay(10);
            return "Hello, World!";
        }

        const asyncGenerator = Q.async(myGenerator);
        const result = await asyncGenerator();
        expect(result).toBe("Hello, World!");
        expect(typeof asyncGenerator).toBe('function');
        const generator = asyncGenerator();
        expect(generator.next).toBeDefined();
        expect(generator.next().done).toBe(false);
    });
});