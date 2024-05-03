extends Control

@export var tree: Tree
var tree_root: TreeItem

func _ready() -> void:
	tree_root = tree.create_item()
	var a = tree.create_item(tree_root)
	a.set_text(0, "A")
	var b = tree.create_item(tree_root)
	b.set_text(0, "B")
	var c = tree.create_item(tree_root)
	c.set_text(0, "C")
	var d = tree.create_item(tree_root)
	d.set_text(0, "D")
