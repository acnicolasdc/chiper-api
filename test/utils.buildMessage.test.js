const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', function() {
    describe('When receives an entity and an action', function() {
        it('Should return the respective message', function() {
            const result =  buildMessage('order', 'create');
            const expect = "order created";
            assert.strictEqual(result, expect);
        });
    });

    describe('When receives an entity and an action but is a list', function() {
        it('Should return the respective message with the entity in plural', function() {
            const result =  buildMessage('order', 'list');
            const expect = "orders listed";
            assert.strictEqual(result, expect);
        });
    });
});

