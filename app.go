package main

import (
	"context"
	"fmt"
	"io/fs"
	"os"

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

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) StartInterview(company string) Questions {
	var questionSets Questions
	yamlFile, err := os.ReadFile("./data/company.yaml")
	if err != nil {
		panic(err)
	}
	err = yaml.Unmarshal(yamlFile, &questionSets)
	if err != nil {
		panic(err)
	}
	fmt.Println("questionSets is :", questionSets)
	// return fmt.Sprintf("yml file is : %s", questionSets)
	return questionSets
}

func (a *App) ReadAllfiles() []File {
	root := os.DirFS("./")
	files, err := fs.Glob(root, "*.yaml")
	if err != nil {
		panic(err)
	}
	var result []File
	var fileData File
	for _, file := range files {
		fileData.Name = file
		fileData.RelativePath = "./" + file
		result = append(result, fileData)
	}
	return result
}
