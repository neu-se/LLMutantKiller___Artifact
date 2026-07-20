import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method correctly', async () => {
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        var result = await Q(obj).post("testMethod", []);
        expect(result).toBe("test");
    });

    it('should reject when post method name is empty', async () => {
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        await expect(Q(obj).post("", [])).rejects.toThrow();
    });
});