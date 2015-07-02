/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-mixed/h-card/mixedpropertries
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('h-card', function() {
   var htmlFragment = "<div class=\"h-card\">\n    <p>\n        <a class=\"p-name org u-url\" href=\"http://mozilla.org/\">Mozilla Foundation</a>\n    </p>\n    <p class=\"adr\">\n        <span class=\"street-address\">665 3rd St.</span>  \n        <span class=\"extended-address\">Suite 207</span>  \n        <span class=\"locality\">San Francisco</span>,  \n        <span class=\"region\">CA</span>  \n        <span class=\"postal-code\">94107</span>  \n        <span class=\"country-name\">U.S.A.</span>  \n    </p>\n</div>";
   var expected = {"items":[{"type":["h-card"],"properties":{"name":["Mozilla Foundation"],"org":["Mozilla Foundation"],"url":["http://mozilla.org/"],"adr":[{"value":"665 3rd St.  \n        Suite 207  \n        San Francisco,  \n        CA  \n        94107  \n        U.S.A.","type":["h-adr"],"properties":{"street-address":["665 3rd St."],"extended-address":["Suite 207"],"locality":["San Francisco"],"region":["CA"],"postal-code":["94107"],"country-name":["U.S.A."],"name":["665 3rd St.  \n        Suite 207  \n        San Francisco,  \n        CA  \n        94107  \n        U.S.A."]}}]}}],"rels":{},"rel-urls":{}};

   it('mixedpropertries', function(){
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
