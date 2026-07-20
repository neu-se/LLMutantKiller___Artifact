describe('Q', () => {
    it('should define property correctly', () => {
        var Q = require("../../../../../../../../../subject_repositories/q/q.js");
        var obj = {};
        var descriptor = { value: 'test', configurable: true, enumerable: true };
        Q.object_defineProperty(obj, 'test', descriptor);
        expect(Object.keys(obj)).toContain('test');
        delete obj.test;
        expect(Object.keys(obj)).not.toContain('test');
    });
});