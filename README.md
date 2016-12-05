## nxus-data-manager

### 

Import file contents as arrays of objects. Includes parsers and exporters for:

-   CSV / TSV
-   JSON
-   GeoJSON / ArcJSON

Provides convenience integration with `nxus-storage` to import and save to a storage model.

#### Installation

> npm install nxus-data-manager --save

#### Options

All responses accept an options argument, in addition to any parser-specific options
you can indicate:

-   `mapping`: object of {field: newField} name mappings
-   `identityFields`: for importing to models, array of fields to be used for createOrUpdate query
-   `truncate`: for importing to models, true/false for deleting existing collection data before import. Ignored if `identityFields` is provided.
-   `strict`: defaults to true. Only import columns/data that matches the attribute names for the model. Set to false to import everything.

#### Events

You can modify the records during import with the following specific events:

-   `records.type`: e.g. `dataManager.after('records.csv', (results) => {})`
-   `record.type`: e.g. `dataManager.after('record.csv', (one) => {})`
-   `models.identity`: e.g. `dataMangaer.after('models.user', (results) => {})`
-   `model.identity`: e.g. `dataManager.after('model.user', (user) => {})`

record_ events occur after parsing and name mapping
model_ events occur after record events and before models are created/updated.

### API

* * *

### parser

Provide a parser for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this renderer should handle
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return parsed array of result objects

### exporter

Provide an exporter for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this exporter creates
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return formatted output content

### export

Request formattted output based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the output content
-   `records` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** The records to export
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the exporter context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** String of formatted output

### import

Request parsed results based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

### importFile

Request parsed results from a file path

**Parameters**

-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

### importToModel

Import string contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

### importFileToModel

Import file contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

### fixture

Import a data file as fixture data. Can specify environment option to only load for e.g. test

**Parameters**

-   `modelId` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to import
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The path to a file
-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options to pass to data-loader.importFile

## API

### 

[src/index.js:32-32](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L32-L32 "Source code on GitHub")

Import file contents as arrays of objects

#### Installation

> npm install nxus-data-loader --save

#### Options

All responses accept an options argument, in addition to any parser-specific options
you can indicate:

-   `mapping`: object of {field: newField} name mappings
-   `identityFields`: for importing to models, array of fields to be used for createOrUpdate query
-   `truncate`: for importing to models, true/false for deleting existing collection data before import. Ignored if `identityFields` is provided.
-   `strict`: defaults to true. Only import columns/data that matches the attribute names for the model. Set to false to import everything.

#### Events

You can modify the records during import with the following specific events:

-   `records.type`: e.g. `app.get('data-loader').after('records.csv', (results) => {})`
-   `record.type`: e.g. `app.get('data-loader).after('record.csv', (one) => {})`
-   `models.identity`: e.g. `app.get('data-loader').after('models.user', (results) => {})`
-   `model.identity`: e.g. `app.get('data-loader).after('model.user', (user) => {})`

record_ events occur after parsing and name mapping
model_ events occur after record events and before models are created/updated.

### API

* * *

### parser

[src/index.js:87-91](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L87-L91 "Source code on GitHub")

Provide a parser for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this renderer should handle
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return parsed array of result objects

### exporter

[src/index.js:97-99](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L97-L99 "Source code on GitHub")

Provide an exporter for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this exporter creates
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return formatted output content

### export

[src/index.js:113-117](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L113-L117 "Source code on GitHub")

Request formattted output based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the output content
-   `records` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** The records to export
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the exporter context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** String of formatted output

### import

[src/index.js:126-133](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L126-L133 "Source code on GitHub")

Request parsed results based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

### importFile

[src/index.js:141-150](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L141-L150 "Source code on GitHub")

Request parsed results from a file path

**Parameters**

-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

### importToModel

[src/index.js:160-164](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L160-L164 "Source code on GitHub")

Import string contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

### importFileToModel

[src/index.js:173-177](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L173-L177 "Source code on GitHub")

Import file contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

### \_storeResultsWithModel

[src/index.js:245-250](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/index.js#L245-L250 "Source code on GitHub")

Simple do-storage function
to help mock up storage for tests, other applications.

**Parameters**

-   `model` **\[type]** [description]
-   `values` **\[type]** [description]
-   `uniqueCriteria` **\[type]** [description]

Returns **\[type]** [description]

### export

[src/JSONExporter.js:14-21](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/JSONExporter.js#L14-L21 "Source code on GitHub")

Stringify an array of results into JSON. Assumes top-level is array, unless
 opts.key is provided to wrap results in an object.

**Parameters**

-   `records` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 
-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `opts`  

### parse

[src/JSONParser.js:14-20](https://github.com/nxus/data-loader/blob/7d771d40971ea335a32ebb2eca77f183b4c7a69f/src/JSONParser.js#L14-L20 "Source code on GitHub")

Parse JSON into an array of results. Assumes top-level is array, unless
 opts.key is provided to pick a top-level key from parsed object as results.

**Parameters**

-   `contents` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `opts`  
