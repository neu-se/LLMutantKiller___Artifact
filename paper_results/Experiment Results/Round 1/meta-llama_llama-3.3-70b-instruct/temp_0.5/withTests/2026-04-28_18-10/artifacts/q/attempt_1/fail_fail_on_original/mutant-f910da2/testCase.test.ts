import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.async", () => {
    it("should correctly handle ES6 generators", () => {
        function* myGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }

        const asyncGenerator = Q.async(myGenerator);
        const result = asyncGenerator();
        return result.then((value) => {
            expect(value).toBe(3);
        });
    });

    it("should correctly handle SpiderMonkey generators", () => {
        function myGenerator() {
            try {
                throw new QReturnValue(1);
            } catch (e) {
                return e.value;
            }
        }

        const asyncGenerator = Q.async(myGenerator);
        const result = asyncGenerator();
        return result.then((value) => {
            expect(value).toBe(1);
        });
    });
});