import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post mutation test", () => {
    it("should correctly pass arguments to the dispatched post method", async () => {
        const testObject = {
            testMethod: function(arg1: string, arg2: number) {
                return `${arg1}-${arg2}`;
            }
        };

        const result = await Q(testObject).post("testMethod", ["hello", 42]);
        expect(result).toBe("hello-42");
    });
});