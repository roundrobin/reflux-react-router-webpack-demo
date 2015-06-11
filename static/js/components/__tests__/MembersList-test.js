/*
 *
 * `MembersList-test.js` 
 * 
 * Tests the MembersList view.
 */
jest.dontMock('../MembersList.jsx');

describe('Tests MembersList Component Setup', function() {
  it('Tests if the setup works', function() {
		expect(1).toBe(1);
  });
});

describe('Tests MembersList Component with passed in members and props types', function() {
    it('Tests if the setup works', function() {
        console.log("test");
        //======================================================================
        // External dependencies
        //======================================================================
        var React = require('react/addons');        
        var TestUtils = React.addons.TestUtils;
        var Immutable = require("immutable");
        //======================================================================
        // Internal Dependencies
        //======================================================================
        var MembersList = require('../MembersList.jsx');
        // Creates a members object via Immutable.js to pass it into the MembersList
        // component
        var members = Immutable.fromJS({
            "1": {
                "id": "1",
                "name": "Member 1"
            }
        });

        // Renders the DOM of the component, used for further checks.
        var membersList = TestUtils.renderIntoDocument(
            <MembersList roomId="123" members={members}/>
        );
        expect(membersList.props.roomId).toBe("123");
        // Gets the first member from the MembersList markup
        var member = TestUtils.scryRenderedDOMComponentsWithClass(
            membersList, 'members-area__item');
		//Test if the node contains the name of the member!
        expect(member[0].getDOMNode().textContent).toContain('Member 1');
    });
});
describe('(2) Tests MembersList Component with passed in members and props types', function() {
    it('Tests if the setup works', function() {
    	//======================================================================
        // External dependencies
        //======================================================================
        var React = require('react/addons');
        var Immutable = require("immutable");
        var TestUtils = React.addons.TestUtils;
        //======================================================================
        // External dependencies
        //======================================================================
        var MembersList = require('../MembersList.jsx');
        // Creates a members object via Immutable.js to pass it into the MembersList
        // component
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
        // Renders the DOM of the component, used for further checks.
        var membersList = TestUtils.renderIntoDocument(
            <MembersList roomId="124" members={members}/>
        );
		// Tests if the roomId passed machtes the one internally received!
        expect(membersList.props.roomId).toBe("124");
        var member = TestUtils.scryRenderedDOMComponentsWithClass(
            membersList, 'members-area__item');
		//Test if the node contains the name of the member!
        expect(member[0].getDOMNode().textContent).toContain('Member 2');
        //Test if the node contains not contains a different name.
        expect(member[0].getDOMNode().textContent).not.toContain('Member 1');
        // Tests if the component hold the correct number of members!
        expect(member.length).toEqual(2);
    });
});
