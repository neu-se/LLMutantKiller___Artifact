describe('Q', () => {
    it('should call the post method correctly', async () => {
        const Q = require('../../../../q.js');
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        var result = await Q(obj).post("testMethod", []);
        expect(result).toBe("test");
    });
});