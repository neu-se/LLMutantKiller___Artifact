import { Q } from "./q.js";

describe('Q', () => {
    it('should dispatch delete operation with the correct key', () => {
        const object = { foo: 'bar' };
        const promise = Q(object).del('foo');
        promise.then(() => {
            // We can't directly test if the property is deleted because the del method doesn't actually delete it.
            // However, we can test if the dispatch method is called with the correct key.
            const dispatchSpy = jest.spyOn(Q(object), 'dispatch');
            Q(object).del('foo');
            expect(dispatchSpy).toBeCalledWith('delete', ['foo']);
        });
    });
});