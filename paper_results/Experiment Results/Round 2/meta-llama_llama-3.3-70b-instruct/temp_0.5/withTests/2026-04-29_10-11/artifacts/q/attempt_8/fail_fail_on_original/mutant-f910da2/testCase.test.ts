import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", function () {
    it("should handle StopIteration correctly", function () {
        var asyncFunction = Q.async(function* () {
            try {
                yield Q.resolve(1);
                throw new QReturnValue(2);
            } catch (e: any) {
                if (e instanceof QReturnValue) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        });

        return asyncFunction().then(function (result: any) {
            expect(result).toBe(2);
        });
    });
});