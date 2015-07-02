// Unit test for parser get function

describe('get', function() {
    
    
    var expected = {
        'items': [{
            'type': ['h-card'],
            'properties': {
                'name': ['Glenn Jones'],
                'url': ['http://glennjones.net'],
                'photo': ['http://example.com/photo.jpeg']
            }
        }],
        'rels': {
            'bookmark': ['http://glennjones.net'],
            'alternate': ['http://example.com/fr'],
            'home': ['http://example.com/fr']
        },
        'rel-urls': {
            'http://glennjones.net': {
                'text': 'Glenn Jones',
                'rels': ['bookmark']
            },
            'http://example.com/fr': {
                'media': 'handheld',
                'hreflang': 'fr',
                'text': 'French mobile homepage',
                'rels': ['alternate', 'home']
            }
        },
        'alternates': [{
            'media': 'handheld',
            'hreflang': 'fr',
            'text': 'French mobile homepage',
            'url': 'http://example.com/fr',
            'rel': 'home'
        }]
    },
    html = '<div class="h-card"><a class="p-name u-url" rel="bookmark" href="http://glennjones.net">Glenn Jones</a><img class="u-photo" src="photo.jpeg"/></div><a rel="alternate home" href="http://example.com/fr" media="handheld" hreflang="fr">French mobile homepage</a>';






    it('get - no options.node parse this document', function(){
        var parser,
            result;

        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get({});
        assert.deepEqual( result.items, [] );
        
   });
   
   /*
   it('get - incorrect setting of options.document', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html;
        doc.body.appendChild(node);    
        
        options ={
            'document': node,
            'node': node
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        assert.deepEqual( result, {'items':[],'rels':{},'rel-urls':{},'errors':['The options.document object does not have the right nodeType']} );
 
   });
   */


    
   it('get - standard', function(){
       
        var doc,
            node,
            options,
            parser,
            result;
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'baseUrl': 'http://example.com'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        assert.deepEqual( result, expected );
        
   });
   
   
   it('get - doc pass to node', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html;
        doc.body.appendChild(node);    
        
        options ={
            'node': doc,
            'baseUrl': 'http://example.com'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        assert.deepEqual( result, expected );
 
   });
   
   
    it('get - pass base tag', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html + '<base href="http://example.com">';
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        assert.deepEqual( result, expected );
 
   });
   
   
   it('get - pass no document', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = html + '<base href="http://example.com">';
        doc.body.appendChild(node);    
        
        options ={
            'node': doc,
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        assert.deepEqual( result, expected );
 
   });
   

   it('get - include that does not exists', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML =   '<div class="vcard" itemref="mozilla-org mozilla-adr"><span class="fn">Brendan Eich</span></div><div class="vcard" itemref="mozilla-org mozilla-adr"><span class="fn">Mitchell Baker</span></div><p id="mozilla-org" class="org">Mozilla</p>';
        var altExpected = {
            'items': [{
                'type': ['h-card'],
                'properties': {
                    'org': ['Mozilla'],
                    'name': ['Brendan Eich']
                }
            },
            {
                'type': ['h-card'],
                'properties': {
                    'org': ['Mozilla'],
                    'name': ['Mitchell Baker']
                }
            }],
            'rels': {},
            'rel-urls': {}
        };   
       
        doc = document.implementation.createHTMLDocument('New Document');
        node = document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
      
        
        assert.deepEqual( result, altExpected );
        

 
   });
   
   it('get - impliedValueRule e-content', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-feed"><p class="p-name">Blog</a> <p class="h-entry"><span class="e-content">Mozilla Foundation</span></div>';
        var altExpected = {
                'items': [{
                    'type': ['h-feed'],
                    'properties': {
                        'name': ['Blog']
                    },
                    'children': [{
                        'value': 'Mozilla Foundation',
                        'type': ['h-entry'],
                        'properties': {
                            'content': [{
                                'value': 'Mozilla Foundation',
                                'html': 'Mozilla Foundation'
                            }],
                            'name': ['Mozilla Foundation']
                        }
                    }]
                }],
                'rels': {},
                'rel-urls': {}
            };   
       
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.deepEqual( result, altExpected );
        
        
 
   });
   
   
   it('get - textFormat: normalised', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<a class="h-card" href="http://glennjones.net">\n';
        altHTML += '     <span class="p-given-name">Glenn</span>\n';
        altHTML += '     <span class="p-family-name">Jones</span>\n';
        altHTML += '</a>\n';
 
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'textFormat': 'normalised'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.name[0], 'Glenn Jones' );
        
   });
   
   
   it('get - textFormat: whitespace', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<a class="h-card" href="http://glennjones.net">\n';
        altHTML += '     <span class="p-given-name">Glenn</span>\n';
        altHTML += '     <span class="p-family-name">Jones</span>\n';
        altHTML += '</a>\n';
 
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'textFormat': 'whitespace'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.name[0], '\n     Glenn\n     Jones\n' );
        
   });
   
   
   
   it('get - textFormat: whitespacetrimmed', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<a class="h-card" href="http://glennjones.net">\n';
        altHTML += '     <span class="p-given-name">Glenn</span>\n';
        altHTML += '     <span class="p-family-name">Jones</span>\n';
        altHTML += '</a>\n';

 
        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'textFormat': 'whitespacetrimmed'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.name[0], 'Glenn\n     Jones' );
        
   });
   
   
    it('get - dateFormat: auto', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div>';

        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'dateFormat': 'auto'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.start[0], '2015-07-01t17:30z' );
        
   });
   
   
   it('get - dateFormat: w3c', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div>';

        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'dateFormat': 'w3c'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.start[0], '2015-07-01T17:30Z' );
        
   });
   
   
   it('get - dateFormat: html5', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div>';

        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'dateFormat': 'html5'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.start[0], '2015-07-01 17:30Z' );
        
   });

   
   
   it('get - dateFormat: rfc3339', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div>';

        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'dateFormat': 'rfc3339'
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.equal( result.items[0].properties.start[0], '20150701T1730Z' );
        
   });
   
   
   
   it('get - filters h-card', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div><a class="h-card" href="http://glennjones.net">Glenn Jones</a>';
        var altExpected = {   
            'items': [{
                'type': ['h-card'],
                'properties': {
                    'name': ['Glenn Jones'],
                    'url': ['http://glennjones.net']
                }
            }],
            'rels': {},
            'rel-urls': {}
        }


        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'filters': ['h-card']
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.deepEqual( result, altExpected );
        
   });
   
      
   it('get - filters h-event', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div><a class="h-card" href="http://glennjones.net">Glenn Jones</a>';
        var altExpected = {   
            'items': [{
                'type': ['h-event'],
                'properties': {
                    'name': ['Pub'],
                    'start': ['2015-07-01t17:30z']
                }
            }],
            'rels': {},
            'rel-urls': {}
        }


        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'filters': ['h-event']
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.deepEqual( result, altExpected );
        
   });
   
   
    it('get - filters h-card and h-event', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div><a class="h-card" href="http://glennjones.net">Glenn Jones</a>';
        var altExpected = {   
                'items': [{
                    'type': ['h-event'],
                    'properties': {
                        'name': ['Pub'],
                        'start': ['2015-07-01t17:30z']
                    }
                },
                {
                    'type': ['h-card'],
                    'properties': {
                        'name': ['Glenn Jones'],
                        'url': ['http://glennjones.net']
                    }
                }],
                'rels': {},
                'rel-urls': {}
            }


        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'filter': ['h-event']
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.deepEqual( result, altExpected );
        
   });
   
   
   it('get - filters h-card no result', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<div class="h-event"><span class="p-name">Pub</span><span class="dt-start">2015-07-01t17:30z</span></div>';
        var altExpected = {   
                'items': [],
                'rels': {},
                'rel-urls': {}
            }


        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'filters': ['h-card']
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.deepEqual( result, altExpected );
        
   });
   
   
    it('get - filters h-card match v1 format', function(){
       
       var  doc,
            node,
            options,
            parser,
            result;
            
        var altHTML = '<a class="vcard" href="http://glennjones.net"><span class="fn">Glenn Jones</span></a>';
        var altExpected = {   
                'items': [{
                    'type': ['h-card'],
                    'properties': {
                        'name': ['Glenn Jones'],
                        'url': ['http://glennjones.net']
                    }
                }],
                'rels': {},
                'rel-urls': {}
            }


        doc = document.implementation.createHTMLDocument('New Document');
        node =  document.createElement('div');
        node.innerHTML = altHTML;
        doc.body.appendChild(node);    
        
        options ={
            'node': node,
            'filter': ['h-card']
        };
        // test access the private Modules.Parser object to provide coverage data 
        // please use the public Microformats.get instead 
        parser = new Modules.Parser();
        result = parser.get(options);
        
        assert.deepEqual( result, altExpected );
        
   });



   
  
});