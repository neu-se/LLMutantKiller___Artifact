import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', (done) => {
        const promise = q.defer();
        let resolved = false;
        const originalMessageChannel = window.MessageChannel;
        window.MessageChannel = undefined;
        const originalSetTimeout = setTimeout;
        setTimeout = () => {
            throw new Error('setTimeout was called');
        };
        q.nextTick(() => {
            resolved = true;
            promise.resolve('resolved');
        });
        try {
            originalSetTimeout(() => {
                expect(resolved).toBe(false);
                window.MessageChannel = originalMessageChannel;
                setTimeout = originalSetTimeout;
                q.nextTick(() => {
                    resolved = true;
                    promise.resolve('resolved');
                });
                setTimeout(() => {
                    expect(resolved).toBe(true);
                    done();
                }, 100);
            }, 100);
        } catch (e) {
            expect(e.message).toBe('setTimeout was called');
            window.MessageChannel = originalMessageChannel;
            setTimeout = originalSetTimeout;
            q.nextTick(() => {
                resolved = true;
                promise.resolve('resolved');
            });
            setTimeout(() => {
                expect(resolved).toBe(true);
                done();
            }, 100);
        }
    });
});