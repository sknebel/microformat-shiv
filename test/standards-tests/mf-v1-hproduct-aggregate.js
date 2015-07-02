/*
Microformats Test Suite - Downloaded from github repo: glennjones/tests version v0.1.18 
Mocha integration test from: microformats-v1/hproduct/aggregate
The test was built on Thu Jul 02 2015 21:37:43 GMT+0100 (BST)
*/

assert = chai.assert;


describe('hproduct', function() {
   var htmlFragment = "<meta charset=\"utf-8\">\n<div class=\"hproduct\">\n    <h2 class=\"fn\">Raspberry Pi</h2>\n    <img class=\"photo\" src=\"http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg\" />\n    <p class=\"description\">The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming.</p>\n    <a class=\"url\" href=\"http://www.raspberrypi.org/\">More info about the Raspberry Pi</a>\n    <p class=\"price\">£29.95</p>\n    <p class=\"review hreview-aggregate\">\n        <span class=\"rating\">\n            <span class=\"average value\">9.2</span> out of \n            <span class=\"best\">10</span> \n            based on <span class=\"count\">178</span> reviews\n        </span>\n    </p>\n    <p>Categories: \n        <a rel=\"tag\" href=\"http://en.wikipedia.org/wiki/computer\" class=\"category\">Computer</a>, \n        <a rel=\"tag\" href=\"http://en.wikipedia.org/wiki/education\" class=\"category\">Education</a>\n    </p>\n    <p class=\"brand vcard\">From: \n        <span class=\"fn org\">The Raspberry Pi Foundation</span> - \n        <span class=\"adr\">\n            <span class=\"locality\">Cambridge</span> \n            <span class=\"country-name\">UK</span>\n        </span>\n    </p>\n</div>";
   var expected = {"items":[{"type":["h-product"],"properties":{"name":["Raspberry Pi"],"photo":["http://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/RaspberryPi.jpg/320px-RaspberryPi.jpg"],"description":[{"value":"The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming.","html":"The Raspberry Pi is a credit-card sized computer that plugs into your TV and a keyboard. It’s a capable little PC which can be used for many of the things that your desktop PC does, like spreadsheets, word-processing and games. It also plays high-definition video. We want to see it being used by kids all over the world to learn programming."}],"url":["http://www.raspberrypi.org/"],"price":["£29.95"],"review":[{"value":"9.2 out of \n            10 \n            based on 178 reviews","type":["h-review-aggregate"],"properties":{"rating":["9.2"],"average":["9.2"],"best":["10"],"count":["178"],"name":["9.2 out of \n            10 \n            based on 178 reviews"]}}],"category":["Computer","Education"],"brand":[{"value":"The Raspberry Pi Foundation","type":["h-card"],"properties":{"name":["The Raspberry Pi Foundation"],"org":["The Raspberry Pi Foundation"],"adr":[{"value":"Cambridge \n            UK","type":["h-adr"],"properties":{"locality":["Cambridge"],"country-name":["UK"],"name":["Cambridge \n            UK"]}}]}}]}}],"rels":{"tag":["http://en.wikipedia.org/wiki/computer","http://en.wikipedia.org/wiki/education"]},"rel-urls":{"http://en.wikipedia.org/wiki/computer":{"text":"Computer","rels":["tag"]},"http://en.wikipedia.org/wiki/education":{"text":"Education","rels":["tag"]}}};

   it('aggregate', function(){
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
