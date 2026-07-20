var Q = require("../../../../../../../../../subject_repositories/q/q.js");

describe('Q', () => {
    it('should define property correctly', () => {
        var obj = {};
        var descriptor = { value: 'test', configurable: true, enumerable: true };
        Q.object_defineProperty(obj, 'test', descriptor);
        expect(Object.keys(obj)).toContain('test');
    });
});