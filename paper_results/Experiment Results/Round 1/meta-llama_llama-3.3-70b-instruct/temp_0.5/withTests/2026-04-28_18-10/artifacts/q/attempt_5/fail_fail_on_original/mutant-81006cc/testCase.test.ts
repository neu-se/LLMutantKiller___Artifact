import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method correctly', async () => {
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        var result = Q(obj).post("testMethod", []);
        await result.then((value) => {
            expect(value).toBe("test");
        });
    });
});