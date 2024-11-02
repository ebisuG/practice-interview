# README

## About

This is the official Wails React-TS template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Generate Module
`wails generate module`

## Building

To build a redistributable, production mode package, use `wails build`.


## Yaml File Format
```yaml
phase:
    early:
        - Can you explain yourself?
        - Could you explain the reason you want to work here?
    middle:
        - What was the most difficult job in your carrer?
        - How do you handle a conflicts in your team?
        - What do you think your strongness and weakness?
    late:
        - How much salary do you want?
        - What is job for you?
        - Do you like hard work?
        - Do you have any question?
```
