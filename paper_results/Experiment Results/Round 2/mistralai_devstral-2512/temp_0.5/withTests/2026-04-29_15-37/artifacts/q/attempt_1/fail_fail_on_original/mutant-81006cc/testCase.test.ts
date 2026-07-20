import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.mapply behavior", () => {
    it("should correctly dispatch method calls with arguments", async () => {
        const testObject = {
            testMethod: function(arg1: number, arg2: number) {
                return arg1 + arg2;
            }
        };

        const result = await Q.mapply(testObject, "testMethod", [3, 5]);
        expect(result).toBe(8);
    });
});