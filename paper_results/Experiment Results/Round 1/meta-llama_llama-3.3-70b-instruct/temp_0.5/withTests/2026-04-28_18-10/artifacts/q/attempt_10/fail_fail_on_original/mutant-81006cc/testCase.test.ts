describe('Q', () => {
    it('should reject when post method name is empty', async () => {
        const Q = require('../../../../q.js');
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        await expect(Q(obj).post("", [])).rejects.toThrow();
    });
});