## v0.0.15 - (2016-05-18)

--------------

NEW FEATURES

 - in server/studio:
  - new snippets availble for Locco and Chocodash:

            # Require Locco Interface
            snippet locco_require_interface
            
            # Locco full Interface
            snippet locco_interface_full
            
            # Locco full Interface.Web.Html
            snippet locco_interface_html_full
            
            # Locco standard Interface.Web.Html
            snippet locco_interface_html_standard
            
            # Locco minimal Interface.Web.Html
            snippet locco_interface_html_minimal
            
            # Chocodash require
            snippet require_chocodash
            
            # Chocodash async or flow
            snippet chocodash_async_or_flow

  - you can add user defined snippets in data/config.coffee

            exports.snippets:
                coffee:"""
                # New Service Page
                snippet service_page
                \tInterface = require 'chocolate/general/locco/interface'
                \tmodule.exports = new Interface.Web.Html
                \t\tdefaults: ->
                \t\trender: ->
                """
 - in data/config, you can add a default page handler to which redirect unkonwn pages

            exports.defaultExchange = where:'demo', what:'showme', params: name: -> 0
            
    - `where`: module name you want to call for every unknown page
    - `what`: function name in the module do call (if omitted the module itself will be called)
    - `params`: params to pass to the function. If the param value is a function, then the returned value will be used as a key index to the original params. 0 is the page path and 1...N are the querystring parameters' value
                

UPDATES

 - in server/interface:
  - you can now directly export an Interface.Web object in a file module without the 'interface' attribute
            
            Interface = require 'chocolate/general/locco/interface'
            module.exports = 
                new Interface.Web -> div 'Hello'
            
        instead of 
                        
            Interface = require 'chocolate/general/locco/interface'
            exports.interface = 
                new Interface.Web -> div 'Hello'
  - config module available in __ params of locco/interface service

 - in locco/interface:
  - 'render' replaces 'action' in interface definition. 'action' stays available as a 'render' synonym
    
            html = new Interface.Web.Html
                action: ->
                    div 'Hello World'
        
        is equivalent to the new preferred syntax:
                
            html = new Interface.Web.Html
                render: ->
                    div 'Hello World'

  - 'check' replaces 'values' in interface definition. 'values' is not supported anymore

  - bin content becomes available in 'render' function arguments:
            
            demo = new Interface
                render: ->
                    {who, where} = @bin
            
            demo = new Interface
                render: (bin) ->
                    {who, where} = bin
            
            demo = new Interface
                render: ({who, where}) ->
            
            demo = new Interface ({who, where}) ->
    
  - 'defaults' can be passed as a param to an interface definition
 
            html = new Interface.Web.Html {menu}, -> menu()

  - Interface.Web code rewritten to manage naming collision in different module
 
  - in Interface.Web render function, this.keys is an array with the names of the values copied in this.bin

 - in locco/chocodash:
   - added _.clone function to enable object deep copy

FIXED BUGS

  - in locco/interface
    - review is done properly on Web interfaces just before de render function is called and not globally at begining
    - make available __ context in bin arguments of sub interfaces
    - make available locals (like _ and Chocokup) as local variable of sub interfaces

## v0.0.14 - (2016-05-09)

--------------

NEW FEATURES

 - added debug mode using node-inspector (add exports.debug = true in data/config.coffee then connect to http://myserver:8081/debug?ws=myserver:8081&port=5858
 - monitor.coffee, workflow.coffe: replace uncaughtException handling with a more general logging system serialized to a ./data/chocolate.log

 
UPDATES

 - in chocokup.coffee
   - added Chocockup.Html as an alias to Chocokup.Panel
   - support functions in coffeescript markup attributes
 - in locco/interface.coffee:
   - an Interface submit now has its steps function moved out review. So we have: review, steps and then action. 
     - 'review' is there to prepare the interface and check if we can use it
     - 'steps' is there to execute internal actions before responding to the request
     - 'action' is there to react to the submit
   - added Interface.Web.Html as an alias to Interface.Web.Panel
 - added 'exports.debug = false # http://myserver:8081/debug?ws=myserver:8081&port=5858' in chocomake to show debug option in new projects
 - added params in server/interface.coffee 'context' so params are also available in @bin.__ in a locco/interface
 - updated chokidar to v1.4.3
 - updated microtime to v2.1.1
 - updated sqlite3 to v3.1.3


FIXED BUGS

 - in locco/interface: values ans steps declaration were defaulted with _.defaults, but they are functions (so no more _.defaults on them)!
 - in chocokup.coffee: render attributes when an empty string is specified
 - in locco/interface.coffee: 
   - defaults in sub interfaces not handled properly
   - recursive interfaces not handled properly and reviewed infinitely
   - cleaned bin in Interface object before review'ing' it's content
 - in workflow.server: allow array arguments in request. Just have to repeat the &field=value


## v0.0.13-1 - (2016-04-13)

--------------

NEW FEATURES

 - Studio
  - added Login/Logoff indicator, switch and key input
  - added switch to toggle wrap mode on or off in editor
  - added Literate CoffeeScript support (use .litcoffee file type)
  - added Json file support in editor
  - added basic element creation support $('<tag/>') in liteJq
 - monitor.coffee: 
  - added memory param to define node.js --max-old-space-size param
  - added named params --appdir, --port, --memory

UPDATES

 - __ is a Chocolate context given to every remotely called exported module function 
 - __.appdir is relative path from Chocolate system directory to application directory
 - __.sysdir is relative path from application directory to Chocolate system directory
 - updated coffee-script to 1.9.1
 - server/Document.Cache: added async mode to access file and made it default mode

FIXED BUGS

 - corrected -webkit-overflow-scrolling:touch in Chocokup body CSS
 - static file now seen as 'app' if `how` query parameter isnt 'web' ; otherwise seen as 'static' even if with other params (can pass parameters to static files.)
 - correctly load CoffeeScript in chocodown.js if run server side on node.js
 - remove 'chocolate' from `require`d url if used to load Chocolate libs from static folder
 - File::moveFile was not working correctly anymore
 - Upload service was not working anymore - name attribute was missing on iframe
 - _.super can be called in _.prototype declared constructor

## v0.0.12 - (2015-03-30)

--------------

NEW FEATURES

Studio

 - introduced Light theme (now by default) white-grey/blue, that you can switch back (use the up right □ symbol) to Dark original chocolate theme
 - added a dropdown selector to help you switch between opened files
 - added a up right `close` button to give another place to close the currently opened file
 - added a up right `show invisible` button to show or hide the `space`, `tab` and `return` chars
 - added a CTRL-U/CMD-U shortcut to insert a UUID in the code

liteJq, server/Interface and server/Workflow

- Websocket is now supported (with with poling fallback) to allow message exchange between client and server in both size  

chocodown.js

- Turn {{ javascript }} and {{{ coffeescript }}} blocks into `script` blocks
- Turn <<< Chocokup >>> blocks into html blocks
 
locco/Document, locco/Workflow, locco/Interface, locco/Actor

- lot of work done but not yet ready

UPDATES

Locco

- Interface options don't need the `rules` keyword anymore. Just put `defaults`, `values`, `locks` before the `action` section. `rules` is not recognize now.

liteJq 

- taking care of javascript when inserting html block - eg: $('.myClass').html()
- added json-late format: json Chocolate format which allows to save functions, date... in json-like notation
- added `after` function that allows inserting after a DOM node

chocodash

 - added `_.isObject`: returns true if value is not a primitive
 - added `_.isBasicObject`: returns true if value constructor is {}.constructor
 - added `_.param`: transforms a javascript value to an url query parameter
 - added `_.extend`: copies values from an object to another object

Studio

- the opened files panel now keeps a link to the last 10 opened files (instead of 5)


## v0.0.11 - (2014-04-11)

--------------

UPDATES

Chocodash

- _.super was working only in a simple case

FIXED BUGS

Chocodash

- static/lib/chocodash.js was not correctly recompiled in v0.0.10

Locco

- Interface replaced @rules and @action by provided params in constructor instead of merging them


## v0.0.10 - (2014-04-07)

--------------

NEW FEATURES

Chocolate directory structure

- moved vendor libraries from /static to /static/vendor
- renamed **/general/intentware** folder to **/general/locco**  
  You **should** update references to this folder if you use it in your Chocolate application
- renamed **/static/ijax** folder to **/static/lib**  
  You **should** rename this folder if you have one in your Chocolate application
- renamed **/static/ijax/ijax.js** file to **/static/lib/locco.js**  
  You **should** rename this file if you have one in your Chocolate application

Locco Interface:

- introduce `Interface` service that manages security, defaults and values valid range
- `Interface.Web` to easily create web app interface with Chocokup

Chocokup:

- added the `id([value])` function to generate ids (added in coffeekup)

        button "##{id()}", i for i in [9..0]
  
- can pass parameters to embedded coffeescript block

        ids = clear: id()
        body -> button "##{ids.clear}", "clear"
        coffeescript {ids}, ->
            $ -> 
                $("##{ids.clear}").on "click", -> alert "clear"

- produced code is now not formatted (meaningfull whitespace problem).  
  Should use the `format` parameter.
- more isolated parameters: @__.content() instead of @content (idem for @body and @head) in kups
- Chocokup.App to include Chocodash, litejQ, Coffeescript, Locco
- Chocoss:
  - preparing Chocokup Css Framework 
  - added Eric Meyer's Reset CSS v2.0  
  - introduced Css themes: reset(default), paper, writer, coder

Chocodash:

 - renamed Chocoflow into Chocodash
 - started to move javascript utilities into Chocodash:
   - \_.type, \_.Type, \_.defaults, \_.serialize, \_.parallelize, \_.stringify, \_.parse
   - \_.Signal, \_.Observer and \_.Publisher implement reactive programing services (from Reactor.js)
   - add Class-like service with \_.protoype (with inherit, adopt and use)
   - \_.Uuid:
     - added an interface in Uuid so that /-/general/locco/uuid displays a new Uuid

Chocodown:

- adds the formatChocokup option in Chocodown.converter

Coffeekup:

- added the `id` helper function that will return an incremental id
- Locco now independent from Mootools (works with litejQ or jquery) 

Studio

- in Chocodown panel, you can specify wether you want embedded Chocokup code to produce formatted HTML
- Specolate has a better error handling
- console.log is now copied in Studio message box

FIXED BUGS

- header and footer when not in a Chocokup Panel work as standard HTML5 tags
- renamed internal Coffeekup 'data' variable to '__data' to avoid colisions
- display error produced in Interface.exchangeSimple when user has sofkey privileges
- removed Chocokup **title** helper. Now **title** works as a standard html tag
- added Chocokup Core Css in Chocodown Lab view
- added `panel` css class to Chocokup panels so it can be styled
- removed useless `div` in Chocokup panels
- Chocolate's module loader is more robust
- server/interface forget-key renamed to forget-keys

UPDATES

- updated coffee-script to 1.7.1
- updated Ace to package March.08.2014


## v0.0.9 - (2013-12-04)

--------------

NEW FEATURES

- **litejQ** : a lite jQuery-compatible library (9kb compressed and gziped) 
  aimed at replacing Mootools in Chocolate and becoming its client-side scripts foundation.
- with Chocodown
 - inline tests: open litejQ documentation (/general/docs/doc-litejq.md) 
   and open the doccolate panel (Doc) to see the `check` function working
- in Locco:
 - can call a function in a sub-object inside a module  
  `https//myserver/mymodule?MyObject.function?param1&param2`
 - params can be unnamed and numeric when calling a function inside a module  
  `https//myserver/mymodule?add?123&9872`
- in Studio:
 - can change debug evaluation column width by pressing +/- buttons 
- in Newnotes:
 - create a new note by pressing Return 
 - when editing, create a new note by pressing Return if cursor at the end
 - when editing, insert a newline with Ctrl + Return or Shift + Return or press only return if not at note's end
 - toggle a note by pressing Shift-Return
 - toggle note priority by pressing Ctrl-Return when not editing
 - insert a new note before a note with Alt + Return
 - split a note in two notes with Ctrl-Shift-Return when editing

FIXED BUGS

- static files can be created or deleted through studio interface in an app
- deleting a file was copying it in default.coffee!
- can pass parameters to static files. They were seen as 'app' instead of 'static' if with params
- don't execute debug compilation in coffeescript lab when debug panel is hidden
- problem in debug panel with multiple empty strings ('')
- chocokup css helper did not understand @media clause

UPDATES

- updated Newnotes documentation
- updated Ace to package 12.02.2013


## v0.0.8 - (2013-10-01)

--------------

NEW FEATURES

- Basic **autocomplete and snippets** services introduced in editor
- First step in **ChocoDB** : write and read Javascript object in database
- Added Chocoflow: basic **serialize** and parallelize services
- Added a basic **profiling** tool to Debugate
- Synchronize editor view with Documentation (Docco) view
- Changed Locco **test** command to the more appropriate **eval**

FIXED BUGS

- synchronisation problems removed in Coffeescript Lab debug panel
- make Specolate unit tests work better client side (force module loading and clean)
- force resize editor view when switching between horizontal and vertical side-by-side

UPDATES

- updated Ace to package 07.31.2013
- updated node-sqlite3 to 2.1.17
- updated coffee-script to 1.6.3

 
## v0.0.7 - (2013-07-10)

--------------

NEW FEATURES

- Newnotes: add automatic refresh on remote change
- Chocokup: add Css support (write Css with Coffeescript syntax) 
- Chocodown: add .chocodown .cd support in Studio
- Chocodown: add .chocodown .cd support as static file type

FIXED BUGS

- replace div with iframe for Doccolate panel in studio
- removed a bug introduced in v0.0.6 (alert in Coffeescript debug mode)

UPDATES

- add Css support for Chocokup sample in README.md


## v0.0.6 - (2013-07-01)

--------------

NEW FEATURES

- Replaced *Chocokup lab* by **Chocodown lab** (literate style web dev using Markdown)
- Enhanced *Debug Lab* display : vertical scroll sync between Coffescript and Debug panels
- Updated Help to introduce Chocodown
- Updated ReadMe to replace Chocokup Lab with Chocodown Lab section

FIXED BUGS

- Column alignment for values fixed in Lab with Coffeescript debug mode


## v0.0.5 - (2013-06-24)

--------------

NEW FEATURES

- allow binary file in Locco 'move' verb
- now specolate specs receive system context variable in jasmine.getEnv().__
- allow file basic upload
- allow list and open every file type

FIXED BUGS

- replace static strings in the Lab before Debug so that = and [ dont break
- clean File.coffee code to allow all file types
- reintroduced javascript execution in Chocokup lab (it disappeared with iframe usage)

UPDATES

- updated Ace to package 06.04.2013

## v0.0.4 - (2013-05-03)

--------------

NEW FEATURES

- simplified and enhanced Chocokup use in Chocodown : use `! chocokup` and `#! chocokup` in `code` block to execute Chocokup or to highlight and then execute Chocokup code
- added JSON output type in Newnotes.Present (`as` parameter can be: paper, impress or json). It helps export Newnotes branches.
- added `keypass` parameter inconfig.coffee file to enable master key (sofkey) bypass ; enable demonstration mode when used with access restriction on files

FIXED BUGS

- enhanced monitor.config to wait for child process to exit on SIGTERM before exiting ourself so that Upstart can cleanly stop us
- Specolate did not work serverside because jasmine-node module was missing from package.json
- Specolate was no working with appdir module specs and with nonexistent module

## v0.0.3 (2013-04-19)

--------------

NEW FEATURES

- Html support added in Studio
- Nice interface to register/unregister access keys
- Make Chocokup playgroud/sanbox independant in an iFrame
- Make Git history follow files renames
- Add file Rename/Delete services

FIXED BUGS

- make Http only Chocolate server really work!
- make ?how=edit use file type to set correct Ace language parser
- files could not be saved in static folder - static was only available to read file
- locals variable can be declared in Chocokup param and not only in Chocokup.render
- helpers variable can be declared in Chocokup to  provides helpers functions or sub-templates to a main template
- clear Coffeescript JS panel when ther is an error
- added __ parameter documentation

## v0.0.2 (2013-04-05)

--------------

NEW FEATURES

- better Bootstrap compatibility with Chocokup
- http only webapp - use config.coffee file with exports.http_only = yes
- move port, key and cert parameters in config.coffee
- better Chocokup and General error info returned by Chocolate

FIXED BUGS

- cpu to 100% with fresh project
- editing code in lab panel is very laggy
- 'body' does not work in chocokup when not used in panel
- 'static' folder missing
- incorrected Monit sample to supervise the upstart daemon
- update client libraries:
  - coffescript: 1.6.2
  - jasmine: 1.3.1
  - ace: build 2013-03-14
- .js documents don't always work in editor

##v0.0.1 (2013-03-24)

----------------

Initial public release

