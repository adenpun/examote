extends Control

@export var root_container: EmContainer

func _ready() -> void:
	var a = preload ("res://src/EM_nodes/EM_text/EM_text.tscn").instantiate()
	root_container.add_child_em_node(a)
	a.on_inspector_field_changed("text", "[color=red]hello[/color] world")
	pass
