# feathers-chat-app

> Example real time chat app with Feathers

## About

Example real time chat app with Vue.js frontend, based on tutorial
[Building Your First Feathers App](http://docs.feathersjs.com/getting-started/readme.html)

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-chat-app; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).

## Deployment

To deploy to Zeit, need the database files to be in `/tmp` folder.
Also, Zeit does not support socket.io, switched to using Feathers Rest
client.

## Dumping and setting database

Each service stores its data in plain file using NeDB. To move / clone / copy
database between deployments, I am using my middleware
[feathers-nedb-dump](https://github.com/bahmutov/feathers-nedb-dump).

To dump `messages` database to local file, edit file
[get-messages.sh](get-messages.sh) and run it.

```text
./get-messages.sh
```

To set `messages` database from local file, run
[set-messages.sh](set-messages.sh).

