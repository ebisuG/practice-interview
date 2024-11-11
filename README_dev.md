## Command
### Run in Dev Mode
To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

### Generate Module
`wails generate module`

### Building
To build a redistributable, production mode package, use `wails build`.

## How This Works
### Modal Window
For modal window, adding `id` to index.html.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>practice-interview</title>
</head>
<body>
<div id="root"></div>
<div id="portal"></div>
<script src="./src/main.tsx" type="module"></script>
</body>
</html>
```

In `createFile.tsx`, uses div with `id="portal"` to render portal window.
```TypeScript
    return ReactDOM.createPortal(
        <>
            <div
                className="z-20  bg-amber-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-black border rounded">
                <div onClick={props.close} className="hover:cursor-pointer text-white bg-red-500 w-5 p-1 rounded">X</div>
                <div className="m-1"><input className="border p-1" ref={() => fileName} defaultValue={""} onChange={(e) => handleOnChange(e)} /></div>
                <div className="flex justify-center">
                    <div className="m-1 mb-5 text-center w-[50px] bg-lime-200 rounded border-lime-400 border">
                        <button onClick={() => createFile(fileName.current)}> Create</button>
                    </div>
                </div>
            </div>
            <div className="z-10  bg-white fixed top-0 left-0 right-0 bottom-0 opacity-50" ></div>
        </>
        , document.getElementById("portal")!
    )
```

### Structured Clone
In `Edit.tsx`, use `structruedClone`.
```TypeScript
    function updateQuestion(s: keyof main.Stages, q: string[]) {
        const copy = structuredClone(interviewQuestion as main.Questions)
        copy.Stages[s] = q
        setInterviewQuestion(copy)
    }
```
For example in the case that simply assign `interviewquestion` to a new variable `copy` again, React doesn't find the state change.\
This function is called from child component and in this case it happens.

## Tools
### GIMP
For generating `icon.ico` inside `windows` folder, using GIMP.\
Edit png file and export as `ico` format.

## Specification
### Yaml File Format
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
### Tech Stack
Wails : v2.9.2\
React : 18.2.0\
Go : 1.22.3

### Basic color
Background : #f2f2f2\
Lime : #a3e635\
Amber : fbbf24