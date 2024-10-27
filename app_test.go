package main

import "testing"

func TestReadAllfiles(t *testing.T) {
	var expect1, expect2 File
	expect1.Name = "company.yaml"
	expect2.Name = "company copy.yaml"
	expect1.RelativePath = "./company.yaml"
	expect2.RelativePath = "./company copy.yaml"
	actual := NewApp().ReadAllfiles()

	if expect2.Name != actual[0].Name {
		t.Fatalf("expect2 file name is wrong : actual is %v, expect2 is %v", actual[0], expect2)
	}
	if expect2.RelativePath != actual[0].RelativePath {
		t.Fatalf("expect2 file path is wrong: actual is %v, expect2 is %v", actual[0], expect2)
	}
	if expect1.Name != actual[1].Name {
		t.Fatalf("expect1 file name is wrong")
	}
	if expect1.RelativePath != actual[1].RelativePath {
		t.Fatalf("expect1 file path is wrong")
	}

}
