// __tests__/MembersList-test.js
jest.dontMock('../MembersList.jsx');

// describe('Tests MembersList Component', function() {
//   it('Tests if the setup works', function() {
// 		expect(1).toBe(1);
//   });
// });

describe('Tests MembersList Component', function() {
  it('Tests if the setup works', function() {
  	console.log("test");
    var React = require('react/addons');
    var MembersList = require('../MembersList.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render a checkbox with label in the document
    var membersList = TestUtils.renderIntoDocument(
      <MembersList roomId="123"/>
    );

	expect(membersList.props.roomId).toBe("123");
  });

});