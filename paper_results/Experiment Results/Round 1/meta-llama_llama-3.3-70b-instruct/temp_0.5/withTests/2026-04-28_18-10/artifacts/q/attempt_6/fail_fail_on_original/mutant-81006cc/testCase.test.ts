import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method correctly and reject when method name is empty', async () => {
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        var result = Q(obj).post("", []);
        await expect(result).rejects.toThrow();
    });
});