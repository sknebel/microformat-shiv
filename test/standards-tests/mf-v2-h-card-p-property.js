/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v2/h-card/p-property
The test was built on Thu Jul 02 2015 21:37:44 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<div class=\"h-card\">\n    \n    <span class=\"p-name\">\n        <span class=\"p-given-name value\">John</span> \n        <abbr class=\"p-additional-name\" title=\"Peter\">P</abbr>  \n        <span class=\"p-family-name value \">Doe</span> \n    </span>\n    <data class=\"p-honorific-suffix\" value=\"MSc\"></data>\n    \n    \n    <br class=\"p-honorific-suffix\" />BSc<br />\n    <hr class=\"p-honorific-suffix\" />BA\n    \n    \n    <img class=\"p-honorific-suffix\" src=\"images/logo.gif\" alt=\"PHD\" />\n    <img src=\"images/logo.gif\" alt=\"company logos\" usemap=\"#logomap\" />\n    <map name=\"logomap\">\n        <area class=\"p-org\" shape=\"rect\" coords=\"0,0,82,126\" href=\"madgex.htm\" alt=\"Madgex\" />\n        <area class=\"p-org\" shape=\"circle\" coords=\"90,58,3\" href=\"mozilla.htm\" alt=\"Mozilla\" />\n    </map>\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["John Doe"],"given-name":["John"],"additional-name":["Peter"],"family-name":["Doe"],"honorific-suffix":["MSc","PHD"],"org":["Madgex","Mozilla"]}}],"rels":{},"rel-urls":{}};

   it('p-property', function(){
       var doc, node, options, parser, found;
       doc = document.implementation.createHTMLDocument('New Document');
       node =  document.createElement('div');
       node.innerHTML = htmlFragment;
       doc.body.appendChild(node);
       options ={
       		'document': doc,
       		'node': node,
       		'baseUrl': 'http://example.com'
       };
       parser = new Modules.Parser();
       found = parser.get( options );
       assert.deepEqual(found, expected);
   });
});
