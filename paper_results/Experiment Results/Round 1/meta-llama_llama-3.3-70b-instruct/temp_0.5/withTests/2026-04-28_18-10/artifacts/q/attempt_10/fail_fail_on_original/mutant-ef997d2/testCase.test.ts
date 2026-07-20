import { Q } from '../q';

describe('Promise', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q(10);
        expect(promise.inspect()).toEqual({ state: 'fulfilled', value: 10 });
    });
});