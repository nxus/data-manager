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

### DataLoader

[src/index.js:43-183](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L43-L183 "Source code on GitHub")

Import file contents as arrays of objects

#### Installation

> npm install @nxus/data-loader --save

#### Options

All responses accept an options argument, in addition to any parser-specific options
you can indicate:

-   `mapping`: object of {field: newField} name mappings
-   `identityFields`: for importing to models, array of fields to be used for createOrUpdate query

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

#### export

[src/index.js:87-91](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L87-L91 "Source code on GitHub")

Request formattted output based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the output content
-   `records` **\[[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)]** The records to export
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the exporter context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** String of formatted output

#### exporter

[src/index.js:76-78](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L76-L78 "Source code on GitHub")

Provide an exporter for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this exporter creates
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return formatted output content

#### import

[src/index.js:100-105](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L100-L105 "Source code on GitHub")

Request parsed results based on type

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

#### importFile

[src/index.js:113-122](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L113-L122 "Source code on GitHub")

Request parsed results from a file path

**Parameters**

-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of parsed result objects

#### importFileToModel

[src/index.js:145-149](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L145-L149 "Source code on GitHub")

Import file contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `filename` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The filename to read and parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

#### importToModel

[src/index.js:132-136](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L132-L136 "Source code on GitHub")

Import string contents to a model

**Parameters**

-   `model` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The identity of the model to populate
-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') of the content
-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The contents to parse
-   `opts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for the parser context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Array of instances

#### parser

[src/index.js:68-70](https://github.com/nxus/data-loader/blob/79a319262520f3cc3d172a2bbee85cf802334a3a/src/index.js#L68-L70 "Source code on GitHub")

Provide a parser for a particular type (file extension)

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The type (e.g. 'html') this renderer should handle
-   `handler` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to receive (content, options) and return parsed array of result objects
