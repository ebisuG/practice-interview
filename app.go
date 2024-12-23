package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
	"gopkg.in/yaml.v3"
)

// App struct
type App struct {
	ctx context.Context
}

type Questions struct {
	Stages Stages `yaml:"phase"`
}

type Stages struct {
	Early  []string `yaml:"early"`
	Middle []string `yaml:"middle"`
	Late   []string `yaml:"late"`
}

type Sample struct {
	SampleText string `yaml:"sample"`
}

type File struct {
	RelativePath string
	Name         string
}

type Converter interface {
	ParseDataFromFront() FileToWrite
}

type FileToWrite struct {
	FilePath string
	Content  Questions
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	wailsRuntime.EventsOn(a.ctx, "writeYaml", a.WriteQuestionFile)
	wailsRuntime.EventsOn(a.ctx, "createYaml", a.CreateNewFile)
	wailsRuntime.EventsOn(a.ctx, "deleteYaml", a.DeleteQuestionFile)
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) ReadQuestionFile(filePath string) Questions {
	var questionSets Questions
	yamlFile, err := os.ReadFile(filePath)
	// yamlFile, err := os.ReadFile("./data/" + company)
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yamlFile, &questionSets)
	if err != nil {
		panic(err)
	}

	return questionSets
}

func (a *App) ReadAllfiles() ([]File, error) {
	rootFilePath := "./data/"
	if _, err := os.Stat(rootFilePath); errors.Is(err, os.ErrNotExist) {
		err := os.Mkdir("data", 0777)
		if err != nil {
			return nil, errors.New("failed to create data directory")
		}
	}
	root := os.DirFS(rootFilePath)
	files, err := fs.Glob(root, "*.yaml")
	if err != nil {
		panic(err)
	}
	var result []File
	var fileData File
	for _, file := range files {
		fileData.Name = file
		fileData.RelativePath = "./data/" + file
		result = append(result, fileData)
	}
	return result, nil
}

func (a *App) WriteQuestionFile(data ...interface{}) {
	cast := ParseDataFromFront(data)

	yaml, err := yaml.Marshal(&cast.Content)
	if err != nil {
		panic(err)
	}

	f, err := os.Create(cast.FilePath)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	_, err = io.WriteString(f, string(yaml))
	if err != nil {
		panic(err)
	}

}

func (a *App) CreateNewFile(data ...interface{}) {
	name, err := data[0].([]interface{})[0].(string)
	if !err {
		panic(err)
	}
	filePath := "./data/" + name + ".yaml"

	if _, err := os.Stat(filePath); !errors.Is(err, os.ErrNotExist) {
		return
	}

	f, err2 := os.Create(filePath)
	if err2 != nil {
		panic(err)
	}
	defer f.Close()

	var initial Questions
	yaml, err3 := yaml.Marshal(&initial)
	if err3 != nil {
		panic(err3)
	}

	_, err4 := io.WriteString(f, string(yaml))
	if err4 != nil {
		panic(err)
	}
}

func (a *App) DeleteQuestionFile(data ...interface{}) {
	file, err := data[0].([]interface{})[0].(string)
	if !err {
		panic(err)
	}
	err2 := os.Remove(file)
	if err2 != nil {
		log.Fatal(err2)
	}
}

func ParseDataFromFront(data ...interface{}) FileToWrite {
	cast, errBool := data[0].([]interface{})[0].([]interface{})[0].(map[string]interface{})
	if !errBool {
		panic("cast failed")
	}
	filePath := cast["filePath"].(string)

	castEachStage, errBool := cast["questions"].(map[string]interface{})
	if !errBool {
		panic("castEachStage failed")
	}
	EachStage := castEachStage["Stages"].(map[string]interface{})

	stagesEarly, errBool := EachStage["Early"].([]interface{})
	if !errBool {
		panic("stagesEarly failed")
	}

	stagesMiddle, errBool := EachStage["Middle"].([]interface{})
	if !errBool {
		panic("stagesMiddle failed")
	}

	stagesLate, errBool := EachStage["Late"].([]interface{})
	if !errBool {
		panic("stagesLate failed")
	}

	var result FileToWrite
	for _, v := range stagesEarly {
		result.Content.Stages.Early = append(result.Content.Stages.Early, v.(string))
	}
	for _, v := range stagesMiddle {
		result.Content.Stages.Middle = append(result.Content.Stages.Middle, v.(string))
	}
	for _, v := range stagesLate {
		result.Content.Stages.Late = append(result.Content.Stages.Late, v.(string))
	}
	result.FilePath = filePath
	return result
}
