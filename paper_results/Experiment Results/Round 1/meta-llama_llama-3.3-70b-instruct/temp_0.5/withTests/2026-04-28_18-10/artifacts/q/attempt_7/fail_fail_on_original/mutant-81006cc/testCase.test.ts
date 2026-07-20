import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not reject when post method name is empty in the mutated code', async () => {
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        var result = Q(obj).post("", []);
        await expect(result).resolves.not.toThrow();
    });
});