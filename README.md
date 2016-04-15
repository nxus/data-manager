## DataLoader

[src/index.js:43-183](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L43-L183 "Source code on GitHub")

Import file contents as arrays of objects

### Installation

> npm install @nxus/data-loader --save

### Options

All responses accept an options argument, in addition to any parser-specific options
you can indicate:

-   `mapping`: object of {field: newField} name mappings
-   `identityFields`: for importing to models, array of fields to be used for createOrUpdate query

### Events

You can modify the records during import with the following specific events:

-   `records.type`: e.g. `app.get('data-loader').after('records.csv', (results) => {})`
-   `record.type`: e.g. `app.get('data-loader).after('record.csv', (one) => {})`
-   `models.identity`: e.g. `app.get('data-loader').after('models.user', (results) => {})`
-   `model.identity`: e.g. `app.get('data-loader).after('model.user', (user) => {})`

record_ events occur after parsing and name mapping
model_ events occur after record events and before models are created/updated.

## API

### \_defaultImportOptions

[src/index.js:48-51](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L48-L51 "Source code on GitHub")

Import file contents as arrays of objects

#### Installation

> npm install @nxus/data-loader --save

#### Options

All responses accept an options argument, in addition to any parser-specific options
you can indicate:

-   `mapping`: object of {field: newField} name mappings
-   `identityFields`: for importing to models, array of fields to be used for createOrUpdate query
-   `truncate`: for importing to models, true/false for deleting existing collection data before import. Ignored if `identityFields` is provided.

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

### export

[src/JSONExporter.js:14-21](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/JSONExporter.js#L14-L21 "Source code on GitHub")

Stringify an array of results into JSON. Assumes top-level is array, unless
 opts.key is provided to wrap results in an object.

**Parameters**

-   `records` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** 
-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `opts`  

### export

[src/index.js:107-111](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L107-L111 "Source code on GitHub")

Request formattted output based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the output content
-   `records` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** The records to export
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the exporter context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** String of formatted output

### exporter

[src/index.js:91-93](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L91-L93 "Source code on GitHub")

Provide an exporter for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this exporter creates
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return formatted output content

### import

[src/index.js:120-125](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L120-L125 "Source code on GitHub")

Request parsed results based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

### importFile

[src/index.js:133-142](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L133-L142 "Source code on GitHub")

Request parsed results from a file path

**Parameters**

-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

### importFileToModel

[src/index.js:165-169](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L165-L169 "Source code on GitHub")

Import file contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

### importToModel

[src/index.js:152-156](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L152-L156 "Source code on GitHub")

Import string contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

### parser

[src/index.js:81-85](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/index.js#L81-L85 "Source code on GitHub")

Provide a parser for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this renderer should handle
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return parsed array of result objects

### parse

[src/JSONParser.js:14-20](https://github.com/nxus/data-loader/blob/40f0fc89468b63a383542b80417e13818e063043/src/JSONParser.js#L14-L20 "Source code on GitHub")

Parse JSON into an array of results. Assumes top-level is array, unless
 opts.key is provided to pick a top-level key from parsed object as results.

**Parameters**

-   `contents` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `opts`  
