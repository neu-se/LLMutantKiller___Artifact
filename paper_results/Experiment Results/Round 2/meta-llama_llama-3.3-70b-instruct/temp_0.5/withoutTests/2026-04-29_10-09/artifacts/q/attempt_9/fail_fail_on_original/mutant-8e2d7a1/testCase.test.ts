describe('Q', () => {
    it('should set a property correctly', async () => {
        const obj: any = {};
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q(obj).set('key', 'value');
        await promise;
        expect(Object.keys(obj)).toHaveLength(1);
        expect(obj['key']).toBe('value');
    });
});