// __tests__/MembersList-test.js
jest.dontMock('../MembersList.jsx');

describe('Tests MembersList Component Setup', function() {
  it('Tests if the setup works', function() {
		expect(1).toBe(1);
  });
});

describe('Tests MembersList Component with passed in members and props types', function() {
    it('Tests if the setup works', function() {
        console.log("test");
        var React = require('react/addons');
        var MembersList = require('../MembersList.jsx');
        var TestUtils = React.addons.TestUtils;
        var Immutable = require("immutable");
        // Render a checkbox with label in the document
        var members = Immutable.fromJS({
            "1": {
                "id": "1",
                "name": "Member 1"
            }
        });
        var membersList = TestUtils.renderIntoDocument(
            <MembersList roomId="123" members={members}/>
        );
        expect(membersList.props.roomId).toBe("123");
        var member = TestUtils.scryRenderedDOMComponentsWithClass(
            membersList, 'members-area__item');
        expect(member[0].getDOMNode().textContent).toContain('Member 1');
    });
});
describe('(2) Tests MembersList Component with passed in members and props types', function() {
    it('Tests if the setup works', function() {
        var React = require('react/addons');
        var MembersList = require('../MembersList.jsx');
        var TestUtils = React.addons.TestUtils;
        var Immutable = require("immutable");
        var members = Immutable.fromJS({
            "2": {
                id: "2",
                "name": "Member 2"
            },
            "3": {
                id: "3",
                "name": "Member 3"
            },
        });
        // Render a checkbox with label in the document
        var membersList = TestUtils.renderIntoDocument(
            <MembersList roomId="124" members={members}/>
        );
        expect(membersList.props.roomId).toBe("124");
        var member = TestUtils.scryRenderedDOMComponentsWithClass(
            membersList, 'members-area__item');
        expect(member[0].getDOMNode().textContent).toContain('Member 2');
        expect(member[0].getDOMNode().textContent).not.toContain('Member 1');
        expect(member.length).toEqual(2);
    });
});
