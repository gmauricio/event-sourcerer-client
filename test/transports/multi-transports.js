'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Sinon = require('sinon');

const Transport = require('../../lib/transports/multi-transport');

const lab = exports.lab = Lab.script();
const { it, describe } = lab;
const expect = Code.expect;

describe('event sourcing client rabbit transport', () => {

    it('should publish to all transports', () => {

        const transport1 = { publish: Sinon.fake() };
        const transport2 = { publish: Sinon.fake() };
        const transport = new Transport([transport1, transport2]);

        transport.publish('chats', 'xyz', 'created', {
            id: 1
        });

        expect(transport1.publish.calledOnce).to.equal(true);
        expect(transport1.publish.getCall(0).args).to.equal([
            'chats',
            'xyz',
            'created',
            { id: 1 }
        ]);
        expect(transport2.publish.calledOnce).to.equal(true);
        expect(transport2.publish.getCall(0).args).to.equal([
            'chats',
            'xyz',
            'created',
            { id: 1 }
        ]);
    });
});
