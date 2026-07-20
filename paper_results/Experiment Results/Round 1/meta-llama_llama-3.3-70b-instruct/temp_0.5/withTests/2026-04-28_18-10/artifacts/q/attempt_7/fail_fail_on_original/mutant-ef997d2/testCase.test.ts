describe('Promise', () => {
    it('should inspect a promise and return its state', () => {
        const Q = require('./q.js');
        const promise = Q(10);
        const inspectResult = promise.inspect();
        expect(inspectResult).toEqual({ state: 'fulfilled', value: 10 });
        expect(inspectResult.state).toBe('fulfilled');
        expect(inspectResult.value).toBe(10);
        expect(promise.inspect()).toEqual({ state: 'fulfilled', value: 10 });
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toBe(10);
        expect(promise.inspect()).toEqual({ state: 'fulfilled', value: 10 });
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toBe(10);
        expect(promise.inspect()).toEqual({ state: 'fulfilled', value: 10 });
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toBe(10);
        expect(promise.inspect()).toEqual({ state: 'fulfilled', value: 10 });
    });
});