import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', (done) => {
        const promise = Q.defer();
        const channel = new MessageChannel();
        channel.port1.onmessage = () => {
            promise.resolve('resolved');
        };
        channel.port2.postMessage('message');
        promise.promise.then((value) => {
            expect(value).toBe('resolved');
            done();
        });
    });
});