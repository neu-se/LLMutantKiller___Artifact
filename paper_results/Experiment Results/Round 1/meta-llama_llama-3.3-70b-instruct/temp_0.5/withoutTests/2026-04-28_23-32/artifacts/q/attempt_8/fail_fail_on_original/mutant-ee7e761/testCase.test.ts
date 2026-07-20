describe('Q', () => {
    it('should have a delete method named "delete"', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const obj = Q({});
        expect(Object.prototype.hasOwnProperty.call(obj, 'delete')).toBe(true);
    });
});